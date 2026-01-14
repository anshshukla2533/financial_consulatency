import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import FileITR from './pages/client/FileITR'
import CAMarketplace from './pages/client/CAMarketplace'
import MyITRs from './pages/client/MyITRs'
import ClientProfile from './pages/client/Profile'
import ChatPage from './pages/client/ChatPage'

// CA Pages
import CADashboard from './pages/ca/CADashboard'
import CARequests from './pages/ca/CARequests'
import CAMyCases from './pages/ca/CAMyCases'
import CAProfile from './pages/ca/CAProfile'
import CAEarningsPage from './pages/ca/CAEarningsPage'
import CAChatPage from './pages/ca/CAChatPage'

const AppRoutes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Client Routes (nested) */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <Layout userType="client" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="file-itr" element={<FileITR />} />
        <Route path="marketplace" element={<CAMarketplace />} />
        <Route path="my-itrs" element={<MyITRs />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="chat/:itrId" element={<ChatPage />} />
      </Route>

      {/* CA Routes (nested) */}
      <Route
        path="/ca"
        element={
          <ProtectedRoute allowedRoles={['ca']}>
            <Layout userType="ca" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CADashboard />} />
        <Route path="requests" element={<CARequests />} />
        <Route path="my-cases" element={<CAMyCases />} />
        <Route path="earnings" element={<CAEarningsPage />} />
        <Route path="profile" element={<CAProfile />} />
        <Route path="chat/:itrId" element={<CAChatPage />} />
      </Route>

      {/* Redirect based on user role */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to={user.user_type === 'ca' ? '/ca/dashboard' : '/client/dashboard'} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  )
}

export default AppRoutes
