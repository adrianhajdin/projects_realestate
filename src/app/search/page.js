"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "@/components/SearchFilters";
import Property from "@/components/Property";
import noresult from "../../../assets/noresult.svg";
import { baseUrl, fetchApi } from "../../../utils/fetchApi";

const Search = () => {
  const [searchFilter, setSearchFilters] = useState(false);
  const [properties, setProperties] = useState([]);

  // retrieve the value of purpose from the url
  const searchParams = useSearchParams();

  const purpose = searchParams.get("purpose") || "for-rent";
  const rentFrequency = searchParams.get("rentFrequency") || "yearly";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000000";
  const roomsMin = searchParams.get("roomsMin") || "0";
  const bathsMin = searchParams.get("bathsMin") || "0";
  const sort = searchParams.get("sort") || "price-desc";
  const areaMax = searchParams.get("areaMax") || "35000";
  const locationExternalIDs = searchParams.get("locationExternalIDs") || "5002";
  const categoryExternalID = searchParams.get("categoryExternalID") || "4";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
        );

        setProperties(data?.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProperties();
  }, [purpose]);

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="green.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters(!searchFilter)}>
        <Text>Search Property by filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>

      {searchFilter && <SearchFilters />}

      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5">
          <Image src={noresult} />
          <Text fontSize="2xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
