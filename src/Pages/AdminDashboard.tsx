
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  Spinner,
} from "@fluentui/react-components";

import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";

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
  Add24Regular,
} from "@fluentui/react-icons";

import { useNavigate } from "react-router-dom";
import "../Styles/AdminDashboard.css";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  isbn: string;
  stockQuantity: number;
  publishedDate: string;
  coverImageUrl?: string;
}

function AdminDashboard() {
  const { authState, dispatch } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from MongoDB through Books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/Books");

        const booksData = response.data;

        const bookList = Array.isArray(booksData)
          ? booksData
          : booksData?.data ?? booksData?.books ?? [];

        const formattedBooks: Book[] = bookList.map((book: any) => ({
          id: book.id ?? book.Id,
          title: book.title ?? book.Title,
          author: book.author ?? book.Author,
          category: book.category ?? book.Category,
          price: book.price ?? book.Price,
          isbn: book.isbn ?? book.ISBN,
          stockQuantity: book.stockQuantity ?? book.StockQuantity,
          publishedDate: book.publishedDate ?? book.PublishedDate,
          coverImageUrl: book.coverImageUrl ?? book.CoverImageUrl,
        }));

        setBooks(formattedBooks);
      } catch (err) {
        console.error("Books API Error:", err);
        setError("Unable to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Dashboard calculations
  const totalBooks = books.length;

  const totalAuthors = new Set(
    books
      .map((book) => book.author?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const recentBooks = books.slice(0, 5);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");

    dispatch({ type: "LOGOUT" });

    navigate("/login", { replace: true });
  };

  // Loading
  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spinner label="Loading dashboard..." />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>

        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <Book24Regular />
          <span>
            Book<span className="logo-highlight">Store</span>
          </span>
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

        <p className="sidebar-label sidebar-settings-label">
          PREFERENCES
        </p>

        <nav className="admin-nav">
          <div className="nav-item">
            <Settings24Regular />
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div
            className="nav-item logout-item"
            onClick={handleLogout}
          >
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
            <p>Welcome back, {authState.user?.fullName}</p>
          </div>

          <div className="header-actions">

            <Input
              contentBefore={<Search24Regular />}
              placeholder="Search here..."
              className="dashboard-search"
            />

            <div className="header-profile">

              <Avatar
                name={authState.user?.fullName || "Admin"}
                color="brand"
              />

              <div>
                <strong>{authState.user?.fullName}</strong>
                <span>{authState.user?.role}</span>
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

            <h2>{totalBooks}</h2>
            <p className="stat-growth">Books in your store</p>

          </Card>

          <Card className="stat-card">

            <div className="stat-top">
              <span>Total Revenue</span>

              <div className="stat-icon green">
                <Money24Regular />
              </div>
            </div>

            <h2>Not available</h2>
            <p className="stat-growth">Orders API not connected</p>

          </Card>

          <Card className="stat-card">

            <div className="stat-top">
              <span>Total Users</span>

              <div className="stat-icon blue">
                <People24Regular />
              </div>
            </div>

            <h2>Not available</h2>
            <p className="stat-growth">Users API not connected</p>

          </Card>

          <Card className="stat-card">

            <div className="stat-top">
              <span>Total Authors</span>

              <div className="stat-icon orange">
                <Person24Regular />
              </div>
            </div>

            <h2>{totalAuthors}</h2>
            <p className="stat-growth">Unique book authors</p>

          </Card>

        </section>

        {/* Analytics */}
        <section className="analytics-grid">

          {/* User Statistics */}
          <Card className="analytics-card user-analytics">

            <div className="card-heading">
              <div>
                <h3>User Statistics</h3>
                <p>Active and inactive users</p>
              </div>
            </div>

            <div className="revenue-no-data">
              <People24Regular />
              <p>User statistics will appear after connecting the Users API.</p>
            </div>

          </Card>

          {/* Revenue Chart */}
          <Card className="analytics-card revenue-analytics">

            <div className="card-heading">
              <div>
                <h3>Revenue Overview</h3>
                <p>Monthly earnings</p>
              </div>
            </div>

            <div className="revenue-no-data">
              <Money24Regular />
              <p>Revenue analytics will appear after connecting the Orders API.</p>
            </div>

          </Card>

        </section>

        {/* Recent Books */}
        <section className="table-section">

          <div className="section-heading">

            <div>
              <h3>Recent Books</h3>
              <p>Books retrieved from your database</p>
            </div>

            <Button
              appearance="primary"
              icon={<Add24Regular />}
            >
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
                    <th>ISBN</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>

                  {recentBooks.length > 0 ? (

                    recentBooks.map((book, index) => (

                      <tr key={book.id}>

                        <td>{index + 1}</td>

                        <td className="book-title">
                          {book.title}
                        </td>

                        <td>{book.category}</td>

                        <td>{book.author}</td>

                        <td>{book.isbn}</td>

                        <td className="book-price">
                          ₹{book.price}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan={6}>No books found.</td>
                    </tr>

                  )}

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

            <Button appearance="outline" disabled>
              View All
            </Button>

          </div>

          <Card className="table-card">

            <div className="revenue-no-data">
              <ShoppingBag24Regular />
              <p>Order information will appear after implementing the Orders API.</p>
            </div>

          </Card>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;
