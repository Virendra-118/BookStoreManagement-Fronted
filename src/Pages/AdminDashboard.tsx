
import {
  Avatar,
  Button,
  Card,
  Input,
} from "@fluentui/react-components";

import {
  Home24Regular,
  Book24Regular,
  People24Regular,
  ShoppingBag24Regular,
  Person24Regular,
  SignOut24Regular,
  Search24Regular,
  Settings24Regular,
  Library24Regular,
  Money24Regular,
  ChevronDown24Regular,
//   Notifications24Regular,
  Add24Regular,
} from "@fluentui/react-icons";

import "../Styles/AdminDashboard.css";

const monthlyRevenue = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 72 },
  { month: "May", value: 55 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 100 },
  { month: "Sep", value: 75 },
  { month: "Oct", value: 58 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 65 },
];

const recentBooks = [
//   {
//     id: 1,
//     title: "Atomic Habits",
//     category: "Self Help",
//     author: "James Clear",
//     publisher: "Penguin",
//     price: "₹450",
//   },
//   {
//     id: 2,
//     title: "The Psychology of Money",
//     category: "Finance",
//     author: "Morgan Housel",
//     publisher: "Jaico",
//     price: "₹350",
//   },
//   {
//     id: 3,
//     title: "Rich Dad Poor Dad",
//     category: "Finance",
//     author: "Robert Kiyosaki",
//     publisher: "Plata",
//     price: "₹399",
//   },
//   {
//     id: 4,
//     title: "The Alchemist",
//     category: "Fiction",
//     author: "Paulo Coelho",
//     publisher: "Harper",
//     price: "₹299",
//   },
];

const recentOrders = [
//   { id: "#ORD-101", book: "Atomic Habits", customer: "Rahul Sharma", date: "12 Nov 2026", status: "Paid", price: "₹450" },
//   { id: "#ORD-102", book: "The Alchemist", customer: "Priya Singh", date: "11 Nov 2026", status: "Pending", price: "₹299" },
//   { id: "#ORD-103", book: "Rich Dad Poor Dad", customer: "Amit Kumar", date: "10 Nov 2026", status: "Paid", price: "₹399" },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <Book24Regular />
          <span>Book<span className="logo-highlight">Store</span></span>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="admin-nav">
          <div className="nav-item active">
            <Home24Regular />
            <span>Dashboard</span>
          </div>

          <div className="nav-item">
            <Book24Regular />
            <span>Books</span>
          </div>

          <div className="nav-item">
            <Library24Regular />
            <span>Categories</span>
          </div>

          <div className="nav-item">
            <People24Regular />
            <span>Authors</span>
          </div>

          <div className="nav-item">
            <Person24Regular />
            <span>Users</span>
          </div>

          <div className="nav-item">
            <ShoppingBag24Regular />
            <span>Orders</span>
          </div>

          <div className="nav-item">
            <Money24Regular />
            <span>Revenue</span>
          </div>
        </nav>

        <p className="sidebar-label sidebar-settings-label">PREFERENCES</p>

        <nav className="admin-nav">
          <div className="nav-item">
            <Settings24Regular />
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-item logout-item">
            <SignOut24Regular />
            <span>Log out</span>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="header-actions">
            <Input
              contentBefore={<Search24Regular />}
              placeholder="Search here..."
              className="dashboard-search"
            />

            {/* <Button
              appearance="subtle"
              icon={<Notifications24Regular />}
              aria-label="Notifications"
            /> */}

            <div className="header-profile">
              <Avatar name="Admin User" color="brand" />
              <div>
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
              <ChevronDown24Regular />
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="dashboard-stats">

          <Card className="stat-card">
            <div className="stat-top">
              <span>Total Books</span>
              <div className="stat-icon purple">
                <Book24Regular />
              </div>
            </div>
            <h2>500</h2>
            <p className="stat-growth">↑ 10% <span>this month</span></p>
          </Card>

          <Card className="stat-card">
            <div className="stat-top">
              <span>Total Revenue</span>
              <div className="stat-icon green">
                <Money24Regular />
              </div>
            </div>
            <h2>₹45,000</h2>
            <p className="stat-growth">↑ 7% <span>this month</span></p>
          </Card>

          <Card className="stat-card">
            <div className="stat-top">
              <span>Total Users</span>
              <div className="stat-icon blue">
                <People24Regular />
              </div>
            </div>
            <h2>1,250</h2>
            <p className="stat-growth">↑ 12% <span>this month</span></p>
          </Card>

          <Card className="stat-card">
            <div className="stat-top">
              <span>Total Authors</span>
              <div className="stat-icon orange">
                <Person24Regular />
              </div>
            </div>
            <h2>85</h2>
            <p className="stat-growth">↑ 5% <span>this month</span></p>
          </Card>

        </section>

        {/* Analytics */}
        <section className="analytics-grid">

          {/* User Statistics */}
          <Card className="analytics-card user-analytics">
            <div className="card-heading">
              <div>
                <h3>User Statistics</h3>
                <p>Users who buy books</p>
              </div>
            </div>

            <div className="donut-wrapper">
              <div className="donut-chart">
                <div className="donut-center">
                  <strong>65%</strong>
                  <span>Total Users</span>
                </div>
              </div>

              <div className="donut-legend">
                <p><span className="legend-dot purple-dot"></span> Active Users</p>
                <p><span className="legend-dot grey-dot"></span> Inactive Users</p>
              </div>
            </div>
          </Card>

          {/* Revenue Chart */}
          <Card className="analytics-card revenue-analytics">
            <div className="card-heading">
              <div>
                <h3>Revenue Overview</h3>
                <p>Monthly earnings</p>
              </div>

              <Button appearance="outline" size="small">
                Yearly <ChevronDown24Regular />
              </Button>
            </div>

            <div className="revenue-chart">
              <div className="chart-grid">
                {[100, 75, 50, 25, 0].map((value) => (
                  <div className="chart-row" key={value}>
                    <span>{value}k</span>
                    <div className="chart-line"></div>
                  </div>
                ))}
              </div>

              <div className="chart-bars">
                {monthlyRevenue.map((item) => (
                  <div className="bar-column" key={item.month}>
                    <div
                      className={`revenue-bar ${item.month === "Aug" ? "highlight-bar" : ""}`}
                      style={{ height: `${item.value}%` }}
                      title={`${item.month}: ${item.value}k`}
                    ></div>
                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

        </section>

        {/* Recent Books */}
        <section className="table-section">
          <div className="section-heading">
            <div>
              <h3>Recent Books</h3>
              <p>Recently added books in your store</p>
            </div>

            <Button appearance="primary" icon={<Add24Regular />}>
              Add New Book
            </Button>
          </div>

          <Card className="table-card">
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td className="book-title">{book.title}</td>
                      <td>{book.category}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td className="book-price">{book.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Recent Orders */}
        <section className="table-section orders-section">
          <div className="section-heading">
            <div>
              <h3>Recent Orders</h3>
              <p>Latest customer orders</p>
            </div>

            <Button appearance="outline">
              View All
            </Button>
          </div>

          <Card className="table-card">
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Book Name</th>
                    <th>Customer</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td className="book-title">{order.book}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`order-status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="book-price">{order.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
