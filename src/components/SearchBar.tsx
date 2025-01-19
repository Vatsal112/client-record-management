import React from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { ISearchBarProps } from "@/types";

const SearchBar: React.FC<ISearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by ID, Name, or Email"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default SearchBar;
