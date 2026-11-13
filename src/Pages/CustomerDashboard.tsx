
import { useState } from "react";
import {
  Avatar,
  Button,
  Input,
} from "@fluentui/react-components";
import {
  Search24Regular,
  Home24Regular,
  Book24Regular,
  Heart24Regular,
  Cart24Regular,
  Person24Regular,
  SignOut24Regular,
} from "@fluentui/react-icons";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/CustomerDashboard.css";

const books = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    price: 399,
    color: "book-cover-one",
    tag: "Bestseller",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: 450,
    color: "book-cover-two",
    tag: "Popular",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    price: 350,
    color: "book-cover-three",
    tag: "Trending",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 299,
    color: "book-cover-four",
    tag: "Featured",
  },
];

const categories = ["All", "Fiction", "Finance", "Self Help", "Technology"];

function CustomerDashboard() {
  const { authState, dispatch } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");

    dispatch({ type: "LOGOUT" });

    navigate("/login", { replace: true });
  };

  return (
    <div className="customer-dashboard">
      {/* Sidebar */}
      <aside className="customer-sidebar">
        <div className="customer-logo">
          <Book24Regular />
          <span>BookStore</span>
        </div>

        <p className="sidebar-label">MENU</p>

        <nav className="customer-nav">
          <a href="#home" className="customer-nav-link active">
            <Home24Regular />
            Dashboard
          </a>

          <a href="#books" className="customer-nav-link">
            <Book24Regular />
            Browse Books
          </a>

          <a href="#orders" className="customer-nav-link">
            <Cart24Regular />
            My Orders
          </a>

          <a href="#wishlist" className="customer-nav-link">
            <Heart24Regular />
            Wishlist
          </a>

          <a href="#profile" className="customer-nav-link">
            <Person24Regular />
            My Profile
          </a>
        </nav>

        <div className="customer-sidebar-bottom">
          <Button
            appearance="subtle"
            className="customer-logout"
            icon={<SignOut24Regular />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="customer-main">
        {/* Header */}
        <header className="customer-header">
          <div>
            <h2>Customer Dashboard</h2>
            <p>Discover your next favorite book.</p>
          </div>

          <div className="customer-header-profile">
            <div>
              <strong>{authState.user?.fullName || "Customer"}</strong>
              <span>Customer</span>
            </div>

            <Avatar
              name={authState.user?.fullName || "Customer"}
              color="colorful"
            />
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="customer-welcome" id="home">
          <div className="welcome-content">
            <span>WELCOME TO BOOKSTORE</span>

            <h1>
              Find Your Next
              <br />
              Great Read.
            </h1>

            <p>
              Explore thousands of books and discover stories
              that inspire you.
            </p>

            <Button
              appearance="primary"
              onClick={() =>
                document.getElementById("books")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Books
            </Button>
          </div>

          <div className="welcome-decoration">
            <span>BOOKS</span>
            <Book24Regular />
          </div>
        </section>

        {/* Search */}
        <section className="customer-search-section">
          <div>
            <h2>Explore Books</h2>
            <p>Search your favorite books and authors.</p>
          </div>

          <Input
            className="customer-search"
            placeholder="Search books or authors..."
            contentBefore={<Search24Regular />}
            value={search}
            onChange={(_, data) => setSearch(data.value)}
          />
        </section>

        {/* Categories */}
        <section className="category-section">
          <div className="section-heading">
            <h2>Categories</h2>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <Button
                key={category}
                appearance={
                  selectedCategory === category
                    ? "primary"
                    : "secondary"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Books */}
        <section className="books-section" id="books">
          <div className="section-heading">
            <div>
              <h2>Featured Books</h2>
              <p>Handpicked books for you.</p>
            </div>

            <span>{filteredBooks.length} books</span>
          </div>

          <div className="customer-book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div className="customer-book-card" key={book.id}>
                  <div className={`book-cover ${book.color}`}>
                    <span>{book.tag}</span>
                    <Book24Regular />
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </div>

                  <div className="book-details">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>

                    <div className="book-card-footer">
                      <strong>₹{book.price}</strong>
                      <Button
                        appearance="primary"
                        size="small"
                        onClick={() =>
                          alert(`${book.title} selected. Book details will be connected later.`)
                        }
                      >
                        View Book
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books">
                <h3>No books found</h3>
                <p>Try another search or category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Information */}
        <section className="customer-info-grid" id="orders">
          <div className="customer-info-card">
            <Book24Regular />
            <div>
              <strong>Explore More Books</strong>
              <p>Discover books across different categories.</p>
            </div>
          </div>

          <div className="customer-info-card" id="wishlist">
            <Heart24Regular />
            <div>
              <strong>Your Wishlist</strong>
              <p>Keep track of books you love.</p>
            </div>
          </div>
        </section>

        <footer className="customer-footer">
          © 2026 BookStore Management. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default CustomerDashboard;
