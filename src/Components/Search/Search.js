import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Typography, Button, Divider, List, ListItem, ListItemText } from '@mui/material';

import { setproductdata, setSearchQuery, setSuggestions } from '../../features/searchslice';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: "15px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#101810",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    backgroundColor: "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.2, 0, 1.2, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "260px",
      "&:focus": {
        width: "280px",
      },
    },
  },
}));

const SuggestionsList = styled(List)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: '5px',
  zIndex: 10,
  marginTop: theme.spacing(1),
  width: '100%',
  maxHeight: '200px', // Adjust this value as needed
  overflowY: 'auto', // Add vertical scroll
}));

export default function SearchForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control suggestion visibility
  const query = useSelector((state) => state.search.query);
  const suggestions = useSelector((state) => state.search.suggestions);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setActiveSuggestion(activeSuggestion > 0 ? activeSuggestion - 1 : suggestions.length - 1);
      } else if (event.key === 'ArrowDown') {
        setActiveSuggestion(activeSuggestion < suggestions.length - 1 ? activeSuggestion + 1 : 0);
      } else if (event.key === 'Enter') {
        if (suggestions.length > 0) {
          setInputValue(suggestions[activeSuggestion]);
          dispatch(setSearchQuery(suggestions[activeSuggestion]));
          navigate('/Searchpage');
        } else {
          submitQuery();
        }
        // Hide suggestions after Enter is pressed
        setShowSuggestions(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSuggestion, dispatch, navigate, suggestions]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    dispatch(setSearchQuery(value)); // Update query in store
    if (value.trim() !== '') {
      // Dispatch an action to fetch suggestions
      // Implement debounce if needed
      // dispatch(fetchSuggestions(value));
      setShowSuggestions(true); // Show suggestions when input is not empty
    } else {
      setShowSuggestions(false); // Hide suggestions when input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion); // Update input value with clicked suggestion
    dispatch(setSearchQuery(suggestion)); // Update query in store
    navigate('/Searchpage');
    setShowSuggestions(false); // Hide suggestions after suggestion is clicked
  };

  const submitQuery = () => {
    dispatch(setSearchQuery(inputValue));
    navigate('/Searchpage');
    setShowSuggestions(false); // Hide suggestions after query is submitted
  };

  return (
    <Search className="search-form">
      <SearchIconWrapper sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search here.."
        inputProps={{ "aria-label": "search" }}
        value={inputValue}
        onChange={handleInputChange}
      />
      {showSuggestions && inputValue.trim() !== '' && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              selected={index === activeSuggestion}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </SuggestionsList>
      )}
    </Search>
  );
}
