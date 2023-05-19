"use client";

import React, { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import { connectStateResults } from "react-instantsearch-dom";
interface SearchProps {
  indexName: string;
}

interface HitProps {
  hit: {
    name: string;
    category: string;
    locationValue: string;
  };
}

const Search = ({ indexName }: SearchProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (
    !process.env.NEXT_PUBLIC_APP_ID ||
    !process.env.NEXT_PUBLIC_API_KEY ||
    !process.env.NEXT_PUBLIC_INDEX
  ) {
    throw new Error(
      "Environment variables NEXT_PUBLIC_APP_ID or NEXT_PUBLIC_API_KEY are not set"
    );
  }

  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_APP_ID,
    process.env.NEXT_PUBLIC_API_KEY
  );

  const searchClient = {
    ...algoliaClient,
    search(requests: Array<{ indexName: string; params: { query: string } }>) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: "",
            params: "",
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };

  const locationLabel = "Your Gateway to Global Gems!";

  useEffect(() => {
    if (searchActive) {
      searchInputRef.current?.focus();
    }
  }, [searchActive]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchIconClick = () => {
    setSearchActive((prevState) => !prevState);
  };

  const Hit = ({ hit }: HitProps) => (
    <div>
      <h1>{hit.name}</h1>
    </div>
  );

  return (
    <div
      ref={containerRef}
      onClick={handleSearchIconClick}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        relative
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        {!searchActive && (
          <div
            className="
              text-sm 
              px-6
            "
          >
            {locationLabel}
          </div>
        )}
        {searchActive && (
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Configure hitsPerPage={10} />
          </InstantSearch>
        )}
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
            cursor-pointer
          "
        >
          <div
            className="
              p-2 
              bg-custom-blue
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
