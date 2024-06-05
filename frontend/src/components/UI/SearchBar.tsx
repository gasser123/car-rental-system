import classes from "./SearchBar.module.css";
import searchIcon from "../../assets/magnifying-glass-solid.svg";
function SearchBar() {
  return (
    <div className={classes["search-container"]}>
      <input type="text" name="search" />
      <button type="submit"><img src={searchIcon} alt="Search" /></button>
    </div>
  );
}

export default SearchBar;
