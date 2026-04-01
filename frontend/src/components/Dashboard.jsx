import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Avatar } from 'antd';
import {
  UserOutlined, VideoCameraOutlined, LogoutOutlined,
  DashboardOutlined, PlayCircleOutlined, TeamOutlined,
  BookOutlined, CreditCardOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Movies from './Movies';
import Bookings from './Bookings';
import Payments from './Payments';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();
  const [movies,   setMovies]   = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeMenu, setActiveMenu] = useState('1');
  const username = localStorage.getItem('username') || 'Guest';
  const displayName = username.includes('@') ? username.split('@')[0] : username;

  useEffect(() => {
    api.get('/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error('Movies error:', err));

    api.get('/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Bookings error:', err));

    api.get('/api/payments')
      .then(res => setPayments(res.data))
      .catch(err => console.error('Payments error:', err));
  }, []);

  const refresh = () => {
    api.get('/api/bookings').then(res => setBookings(res.data));
    api.get('/api/payments').then(res => setPayments(res.data));
  };

  const handleMenuClick = (e) => {
    if (e.key === '5') {
      localStorage.removeItem('username');
      navigate('/');
    } else {
      setActiveMenu(e.key);
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout className="dashboard-layout">
      <Sider breakpoint="lg" collapsedWidth="0" className="glass-sidebar" width={250}>
        <div className="sidebar-logo">
          <div className="logo-icon">🎬</div>
          <h2>MovieTickets</h2>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]}
          onClick={handleMenuClick} className="sidebar-menu">
          <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>Movies</Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>My Bookings</Menu.Item>
          <Menu.Item key="6" icon={<CreditCardOutlined />}>Payments</Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} className="logout-item">Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout className="main-content-layout">
        <Header className="glass-header">
          <div className="header-content">
            <h2 className="header-title">
              {activeMenu === '1' && 'Overview'}
              {activeMenu === '2' && 'Movies 🍿'}
              {activeMenu === '3' && 'My Bookings 🎟️'}
              {activeMenu === '6' && 'Payment History 💳'}
              {activeMenu === '4' && 'Profile'}
            </h2>
            <div className="header-user">
              <span className="user-greeting">Welcome, {displayName}</span>
              <Avatar icon={<UserOutlined />} className="user-avatar" />
            </div>
          </div>
        </Header>

        <Content className="dashboard-content">

          {activeMenu === '1' && (
            <>
              <p className="dashboard-subtitle">Here is what's happening today</p>
              <div className="stats-grid">
                <Card className="glass-card stat-card" bordered={false}>
                  <div className="stat-icon-wrapper blue">
                    <VideoCameraOutlined className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>TOTAL MOVIES</h3>
                    <p className="stat-value">{movies.length}</p>
                    <span className="stat-trend positive">Available now</span>
                  </div>
                </Card>
                <Card className="glass-card stat-card" bordered={false}>
                  <div className="stat-icon-wrapper purple">
                    <PlayCircleOutlined className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>TOTAL BOOKINGS</h3>
                    <p className="stat-value">{bookings.length}</p>
                    <span className="stat-trend positive">All time</span>
                  </div>
                </Card>
                <Card className="glass-card stat-card" bordered={false}>
                  <div className="stat-icon-wrapper green">
                    <CreditCardOutlined className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>TOTAL REVENUE</h3>
                    <p className="stat-value">₹{totalRevenue}</p>
                    <span className="stat-trend positive">Payments collected</span>
                  </div>
                </Card>
                <Card className="glass-card stat-card" bordered={false}>
                  <div className="stat-icon-wrapper pink">
                    <TeamOutlined className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>LOGGED IN AS</h3>
                    <p className="stat-value" style={{ fontSize: '1.1rem' }}>{displayName}</p>
                    <span className="stat-trend positive">Active session</span>
                  </div>
                </Card>
              </div>
              <div className="content-bottom-section">
                <Card className="glass-card wide-card" bordered={false}>
                  <div className="wide-card-header"><h3>Recent Bookings</h3></div>
                  {bookings.length === 0 ? (
                    <div className="empty-state">
                      <p>No bookings yet. Go to Movies and book your first ticket!</p>
                    </div>
                  ) : (
                    <div className="recent-bookings-list">
                      {bookings.slice(0, 5).map(b => (
                        <div key={b.id} className="recent-booking-item">
                          <span className="rb-movie">🎬 {b.movieTitle}</span>
                          <span className="rb-seats">🪑 {b.seats} seat(s)</span>
                          <span className="rb-price">₹{b.totalPrice}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </>
          )}

          {activeMenu === '2' && (
            <Movies movies={movies} username={username} onBookingDone={refresh} />
          )}

          {activeMenu === '3' && (
            <Bookings bookings={bookings} username={username} onDelete={refresh} />
          )}

          {activeMenu === '6' && (
            <Payments payments={payments} username={username} />
          )}

          {activeMenu === '4' && (
            <div className="glass-card profile-card">
              <div className="profile-avatar">
                <Avatar size={80} icon={<UserOutlined />} className="user-avatar" />
              </div>
              <h2>{displayName}</h2>
              <p className="profile-label">Registered User</p>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="ps-value">{movies.length}</span>
                  <span className="ps-label">Movies Available</span>
                </div>
                <div className="profile-stat">
                  <span className="ps-value">{bookings.filter(b => b.username === username).length}</span>
                  <span className="ps-label">My Bookings</span>
                </div>
                <div className="profile-stat">
                  <span className="ps-value">₹{payments.filter(p => p.username === username).reduce((s, p) => s + p.amount, 0)}</span>
                  <span className="ps-label">Total Spent</span>
                </div>
              </div>
            </div>
          )}

        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
