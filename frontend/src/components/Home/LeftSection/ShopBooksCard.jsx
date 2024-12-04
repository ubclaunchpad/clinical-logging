import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ShopLogBooks from "../../../assets/images/ShopLogBooks.png";
import "./ShopBooksCard.css";

export default function ShopBooksCard() {
  return (
    <a href="/shop-logbooks" className="shop-books-link">
      <div className="shop-books-card">
        <h3>Shop Log Books</h3>
        <ChevronRightIcon className="chevron-icon" />
        <img
          src={ShopLogBooks}
          alt="Shop Log Books"
          className="shop-books-image"
        />
      </div>
    </a>
  );
}
