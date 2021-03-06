# React Error Handling & Axios Instance

## 리액트 에러바운드리

리액트에서는 라이프사이클 메서드를 통해 에러를 캐치할 수 있게 도와준다

- [Ref](https://blog.logrocket.com/react-error-handling-react-error-boundary/)

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

```

이 에러바운드리를 활용하기 위해 axios등의 Ajax라이브러리를 사용할 때는 귀찮게 try catch를 매번쓸게 아니라
인스턴스로 만들어서 활용할 수가 있다

- [Ref](https://github.com/woowa-techcamp-2021/store-10/wiki/%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81%3A-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C)

```js
import axios from 'axios';

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL =
  process.env.SERVER_API_HOST || 'http://localhost:3000/api';

const throwError = (e: any) => {
  throw new Error(e.response?.data?.message || e.message || e);
};

export default {
  async post<T>(url: string, body?: T) {
    try {
      const res = await client.post(url, body);
      return res.data.result;
    } catch (e) {
      return throwError(e);
    }
  },

  async get<T>(url: string): Promise<T> {
    try {
      const res = await client.get(url);
      return res.data.result;
    } catch (e) {
      return throwError(e);
    }
  },

  async delete<T>(url: string): Promise<T> {
    try {
      const res = await client.delete(url);
      return res.data.result;
    } catch (e) {
      return throwError(e);
    }
  },

  async put<T>(url: string, body: T) {
    try {
      const res = await client.put(url, body);
      return res.data.result;
    } catch (e) {
      return throwError(e);
    }
  },

  async patch<T>(url: string, body: T) {
    try {
      const res = await client.patch(url, body);
      return res.data.result;
    } catch (e) {
      return throwError(e);
    }
  },
};
```
