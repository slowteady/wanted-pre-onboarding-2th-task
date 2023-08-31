# 코드리뷰용 소스 가이드

## 소스 트리

```bash
src/
  ├── api/
  │   ├── apiClient.js - API 인스턴스와 헤더 등을 관리
  │   └── issuesApi.js - HTTP 요청 함수 관리
  ├── components/
  │   ├── issues/
  │   │   ├── AdBanner.jsx - 광고 배너 컴포넌트
  │   │   ├── IssuesItem.js - 이슈 아이템 컴포넌트
  │   │   └── IssuesList.jsx - 이슈 리스트 컴포넌트
  │   └── loading/
  │       └── Loading.jsx - 로딩 컴포넌트
  ├── hooks/
  │   └── useRequests.js - HTTP 요청 관리 커스텀 훅
  ├── page/
  │   ├── error/
  │   │   └── Error.jsx - 에러 페이지 컴포넌트
  │   └── issues/
  │       ├── Issues.jsx - 이슈 메인 페이지 컴포넌트
  │       └── IssuesDetail.jsx - 이슈 디테일 페이지 컴포넌트
  ├── router/
  │   ├── Router.jsx - 라우터 컴포넌트
  │   └── routerPaths.js - path 객체 관리 
  ├── utils/
  │   └── message/
  │       └── errorMessage.js - 에러 메세지 관리
  ├── App.jsx
  └── index.jsx
```

## 기능

### 1. 라우터

```js
function Router() {
  const routes = useRoutes([
    {
      path: routerPaths.home.path,
      element: <Navigate to={routerPaths.issues.path} replace />,
    },
    {
      path: routerPaths.issues.path,
      element: <Layout />,
      children: [
        { element: <Issues />, index: true },
        {
          path: routerPaths.issuesDetail.path,
          element: <IssuesDetail />,
        },
      ],
    },
    {
      path: routerPaths.errorRedirect.path,
      element: <Navigate to={routerPaths.error.path} replace />,
    },
    {
      path: routerPaths.error.path,
      element: <Error />,
    },
  ]);

  return routes;
}
```

- useRoutes 함수를 사용하여 객체 형태로 구현
- "/" 와 "/error" path를 replace 처리하여 history 사용 불가능하도록 구현
- 이슈 페이지 관련 컴포넌트들은 Layout 컴포넌트 하위에 위치하도록 중첩 라우터로 구현

### 2. API

```js
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_ISSUES_API_URL,
  timeout: 5000,
});

apiClient.defaults.headers.common["Authorization"] = process.env.REACT_APP_ISSUES_API_ACCESS_TOKEN;
```

- baseURL, 토큰을 env를 이용하여 변수로 관리
- 코드 중복 감소를 위한 인스턴스 생성

```js
export const getIssuesList = (params) => {
  return apiClient.get('', params);
};

export const getIssuesDetail = (id) => {
  return apiClient.get(`/${id}`);
```

- 각 요청에 따른 함수 분기처리로 Promise 리턴

### 3. 요청 관리

```js
function useRequests(fetchFunction, params) {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetchFunction(params);
        if (response.status === 200 && Array.isArray(response.data)) {
          const newIssues = response.data.map((issue) => {
            return changeObjProps(issue);
          });

          setIssues((prevIssues) => [...prevIssues, ...newIssues]);
          setHasNextPage(Boolean(newIssues.length));
          setIsLoading(false);
        } else if (response.status === 200 && typeof response.data === 'object') {
          const newIssues = changeObjProps(response.data);
          setIssues(newIssues);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);

          const msg = response.data.message ? response.data.message : ERROR_MESSAGES.REQUEST_FAILED;
          throw new Error(msg);
        }
      } catch (err) {
        setIsLoading(false);
        setIsError(true);

        if (err instanceof Error) {
          alert(`Error: ${err.message}`);
        } else {
          alert(ERROR_MESSAGES.REQUEST_FAILED);
        }
      }
    }
    fetchData();
  }, [fetchFunction, params]);

  return { issues, isLoading, isError, hasNextPage };
}
```

- 요청 리턴받은 데이터, 로딩 상태, 에러 상태, 다음 페이지가 존재하는지 여부를 리턴해주는 로직을 커스텀 hooks로 구현

### 4. 로딩

```js
function Loading() {
  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
}
```

```js
function Issues() {
  const [page, setPage] = useState(INIT_PAGE);
  const navigate = useNavigate();

  const params = useMemo(() => {
    return {
      params: {
        ...QUERY_PARAMS,
        page,
      },
    };
  }, [page]);

  const { issues, isLoading, isError, hasNextPage } = useRequests(getIssuesList, params);

  if (isError) {
    navigate('/error');
  }

  return (
    <>
      {isLoading && <Loading />}
      <IssuesList issues={issues} hasNextPage={hasNextPage} setPage={setPage} />
    </>
  );
}
```

- 컴포넌트로 관리하여 useRequests 로 리턴 받은 isLoading 값을 사용하여 출력하도록 구현

### 5. 무한 스크롤

```js
function IssuesList({ issues, hasNextPage, setPage }) {
  const observer = useRef();

  const lastIssueRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((node) => {
        if (node[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasNextPage, setPage]
  );

  return (
    <Ul>
      {issues.map((issue, index) => {
        if (issues.length === index + 1) {
          return (index + 1) % 5 === 0 ? (
            <AdBanner ref={lastIssueRef} key={index} />
          ) : (
            <IssuesItem ref={lastIssueRef} key={issue.number} issues={issue} />
          );
        }
        return (index + 1) % 5 === 0 ? <AdBanner key={index} /> : <IssuesItem key={issue.number} issues={issue} />;
      })}
    </Ul>
  );
}
```

- IntersectionObserver API 이용하여 구현
- 마지막 요소를 뷰포트가 캐치했을 때 다음 요청을 보내는 방식으로 구현
- forwardRef 를 이용하여 자식 컴포넌트들의 요소 캐치

### 6. 마크다운 렌더링

```js
function IssuesDetail() {
  const param = useParams();
  const id = param.id;

  const { issues, isLoading } = useRequests(getIssuesDetail, id);

  if (isLoading) {
    return <Loading />;
  }

  if (issues && Object.keys(issues).length > 0) {
    const { avatar_url, body } = issues;

    return (
      <IssueDetailDiv>
        <IssueImgItemDiv>
          <IssueDetailUserImg src={avatar_url} />
          <IssuesItem issues={issues} />
        </IssueImgItemDiv>
        <IssueContentDiv>
          <ReactMarkdown>{body}</ReactMarkdown>
        </IssueContentDiv>
      </IssueDetailDiv>
    );
  }
}
```

- ReactMarkdown 라이브러리를 사용하여 마크다운 형식의 데이터를 변환하여 구현
