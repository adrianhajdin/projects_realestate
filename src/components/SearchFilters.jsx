import { useState, useCallback } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { filterData, getFilterValues } from "../../utils/filterData";

const SearchFilters = () => {
  const [filters] = useState(filterData);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const searchProperties = (filterValues) => {
    const search = {};
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        search[item.name] = item.value;
      }
    });
    router.push(
      path +
        "?" +
        createQueryString(Object.keys(search)[0], Object.values(search)[0])
    );
  };

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w="fit-content"
            p="2">
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
