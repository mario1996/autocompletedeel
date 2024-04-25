import React, {
  useEffect,
  useState,
  useDeferredValue,
  useCallback,
} from "react";
//import { getSearchData } from "../../api/getSearchFields";
import "./index.css";
import Loading from "../Loading";
import AutocompleteItem from "../AutocompleteItem";
import { User } from "../../types/User";

const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const deferredInputValue = useDeferredValue(inputValue);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [autocompleteData, setAutocompleteData] = useState<User[]>([]);

  const fetchData = useCallback(async () => {
    if (deferredInputValue) {
      setIsLoading(true);

      try {
        // This is just another possibility instead of calling the external api,
        // in case of wanting to test this possibility, just have to uncomment the line below and the import and comment the lines 29 to 35
        //const filteredUsers: User[] = await getSearchData(inputValue);

        const users: User[] = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        ).then((response) => response.json());

        const filteredUsers = users.filter((user) =>
          user.name.toLowerCase().includes(deferredInputValue.toLowerCase())
        );

        setAutocompleteData(filteredUsers);
      } catch (error) {
        setAutocompleteData([]);
      }

      setIsLoading(false);
    } else {
      setAutocompleteData([]);
    }
  }, [deferredInputValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    setInputValue(event?.target.value);
    setIsLoading(true);
  };

  const handleClick = (word: string): void => {
    setInputValue(word);
    setAutocompleteData([]);
    setShowSuggestions(false);
  };

  return (
    <div className="autoCompleteWrapper">
      <h1>Autocomplete</h1>
      <div className="inputWrapper">
        <label>
          Input field:{" "}
          <input
            type="text"
            id="inputAutocomplete"
            name="inputAutocomplete"
            onChange={handleChange}
            value={inputValue}
            placeholder="Search..."
          />
        </label>
        {inputValue.length && showSuggestions ? (
          <ul className="autocompleteList">
            {isLoading ? (
              <Loading />
            ) : autocompleteData.length ? (
              autocompleteData.map((user: User) => {
                return (
                  <AutocompleteItem
                    key={user.id}
                    text={user.name}
                    inputValue={inputValue}
                    onSelect={() => handleClick(user.name)}
                  />
                );
              })
            ) : (
              <li>No results found</li>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Autocomplete;
