import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ShopLogBooks from "../../../assets/images/ShopLogBooks.png";
import "./ShopBooksCard.css";

export default function ShopBooksCard() {
  return (
    <a className="shop-books-link" href="https://flowleaflets.my-online.store/browse/catr4T4V_755713.aspx" target="_blank">
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
