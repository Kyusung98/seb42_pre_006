import React, { useContext, useEffect } from 'react';
import './theme.css';
import './quillCustom.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import QuestionAsk from './pages/QuestionAsk';
import Questions from './pages/Questions';
import QuestionEdit from './pages/QuestionEdit';
import AnswerEdit from './components/QuestionDetail/Answer/AnswerEdit';
import UsersPersonalDetail from './pages/UsersPersonalDetail';
import Tags from './pages/Tags';
import Users from './pages/Users';
import BaseLayout from './components/layouts/BaseLayout';
import MainLayout from './components/layouts/MainLayout';
import Guide from './pages/Guide';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import QuestionDetail from './pages/QuestionDetail';
import { AuthContext } from './context/auth-context';
import UserPersonalEdit from './pages/UserPersonalEdit';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route element={<MainLayout hasSidebar />}>
        <Route path="/" element={<Questions />} />
        <Route path="/questions">
          <Route index element={<Questions />} />
          <Route path=":id" element={<QuestionDetail />} />
        </Route>
        <Route path="/guide" element={<Guide />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/questions">
          <Route path=":id/edit" element={<QuestionEdit />} />
        </Route>
        <Route path="/tags" element={<Tags />} />
        <Route path="/users">
          <Route index element={<Users />} />
          <Route path=":id" element={<UsersPersonalDetail />} />
          {isLoggedIn && (
            <Route path=":id/edit" element={<UserPersonalEdit />} />
          )}
        </Route>
        <Route path="/answeredit/:answerId" element={<AnswerEdit />} />
      </Route>
      <Route element={<BaseLayout />}>
        <Route path="/ask" element={<QuestionAsk />} />
        {!isLoggedIn ? (
          <>
            {/** 로그인 전 상태 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/users/:id/edit"
              element={<Navigate replace to="/login" />}
            />
          </>
        ) : (
          <>
            {/** 로그인된 상태에서 로그인, 회원페이지 접근 시도시 홈으로 리다이렉트 */}
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/signup" element={<Navigate replace to="/" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
