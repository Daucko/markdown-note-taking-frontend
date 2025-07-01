import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginScreen from "pages/login-screen";
import RegisterScreen from "pages/register-screen";
import Dashboard from "pages/dashboard";
import UserProfile from "pages/user-profile";
import TaskDetailEdit from "pages/task-detail-edit";
import TaskList from "pages/task-list";
import NotesDashboard from "pages/notes-dashboard";
import NotesList from "pages/notes-list";
import TagAndFolderManagement from "pages/tag-and-folder-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/register-screen" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/task-detail-edit" element={<TaskDetailEdit />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/notes-dashboard" element={<NotesDashboard />} />
        <Route path="/notes-list" element={<NotesList />} />
        <Route path="/tag-and-folder-management" element={<TagAndFolderManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;