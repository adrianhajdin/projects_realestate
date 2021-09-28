import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md';

import { filterData } from '../utils/filterData';
import { baseUrl, fetchApi,  } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

export const SelectFilters = ({
  data,
  handleClick,
  placeholder,
  queryName,
}) => {
  return (
    <Select
      placeholder={placeholder}
      w='fit-content'
      p='2'
      onChange={(e) => handleClick({ [queryName]: e.target.value })}
    >
      {data.map((item) => (
        <option value={item.value} key={item.value}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = ({
    purpose,
    rentFrequency,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    roomsMin,
    bathsMin,
    sort,
    locationExternalIDs,
  }) => {
    const path = router.pathname;
    const { query } = router;

    if (purpose) query.purpose = purpose;
    if (rentFrequency) query.rentFrequency = rentFrequency;
    if (minPrice) query.minPrice = minPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    if (areaMax) query.areaMax = areaMax;
    if (roomsMin) query.roomsMin = roomsMin;
    if (bathsMin) query.bathsMin = bathsMin;
    if (sort) query.sort = sort;
    if (locationExternalIDs) query.locationExternalIDs = locationExternalIDs;
    if (categoryExternalID) query.categoryExternalID = categoryExternalID;

    router.push({
      pathname: path,
      query: query,
    });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`)
        setLoading(false);
        setLocationData(data?.hits);
      };
      fetchData();
    }
  }, [searchTerm]);
  return (
    <Flex
      bg='gray.100'
      p='4'
      justifyContent='center'
      flexWrap='wrap'
    >
      <SelectFilters
        data={filters.purpose.items}
        handleClick={searchProperties}
        placeholder={filters.purpose.placeholder}
        queryName={filters.purpose.queryName}
      />
      {router.query.purpose === 'for-rent' ? (
        <SelectFilters
          data={filters.rentFrequency.items}
          handleClick={searchProperties}
          placeholder={filters.rentFrequency.placeholder}
          queryName={filters.rentFrequency.queryName}
        />
      ) : (
        ''
      )}

      <SelectFilters
        data={filters.minPrice.items}
        handleClick={searchProperties}
        placeholder={filters.minPrice.placeholder}
        queryName={filters.minPrice.queryName}
      />
      <SelectFilters
        data={filters.maxPrice.items}
        handleClick={searchProperties}
        placeholder={filters.maxPrice.placeholder}
        queryName={filters.maxPrice.queryName}
      />
      <SelectFilters
        data={filters.sort.items}
        handleClick={searchProperties}
        placeholder={filters.sort.placeholder}
        queryName={filters.sort.queryName}
      />

      <SelectFilters
        data={filters.areaMax.items}
        handleClick={searchProperties}
        placeholder={filters.areaMax.placeholder}
        queryName={filters.areaMax.queryName}
      />
      <SelectFilters
        data={filters.bathsMin.items}
        handleClick={searchProperties}
        placeholder={filters.bathsMin.placeholder}
        queryName={filters.bathsMin.queryName}
      />

      <SelectFilters
        data={filters.roomsMin.items}
        handleClick={searchProperties}
        placeholder={filters.roomsMin.placeholder}
        queryName={filters.roomsMin.queryName}
      />

      <SelectFilters
        data={filters.propertyType.items}
        handleClick={searchProperties}
        placeholder={filters.propertyType.placeholder}
        queryName={filters.propertyType.queryName}
      />
      <Flex flexDir='column'>
      <Button
        border='1px'
        borderColor='gray.200'
        marginTop='2'
        onClick={() => setShowLocations(!showLocations)}
      >
        Search Location
      </Button>
      {showLocations && (
        <Flex flexDir='column' pos='relative' paddingTop='2'>
          <Input
            placeholder='Type Here'
            value={searchTerm}
            w='300px'
          focusBorderColor='gray.300'
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {searchTerm !== '' && (
            <Icon
              as={MdCancel}
              pos='absolute'
              cursor='pointer'
              right='5'
              top='5'
              zIndex='100'
              onClick={() => setSearchTerm('')}
            />
          )}
          {loading && <Spinner margin='auto' marginTop='3' />}
          {showLocations && (
            <Box height='300px' overflow='auto'>
              {locationData?.map((location) => (
                <Box
                  key={location.id}
                  onClick={() => {
                    searchProperties({
                      locationExternalIDs: location.externalID,
                    });
                    setShowLocations(false);
                    setSearchTerm(location.name);
                  }}
                >
                  <Text
                    cursor='pointer'
                    bg='gray.200'
                    p='2'
                    borderBottom='1px'
                    borderColor='gray.100'
                  >
                    {location.name}
                  </Text>
                </Box>
              ))}
              {!loading && !locationData?.length && (
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  flexDir='column'
                  marginTop='5'
                  marginBottom='5'
                >
                  <Image src={noresult} />
                  <Text fontSize='xl' marginTop='3'>
                  Waiting to search!
                  </Text>
                </Flex>
              )}
            </Box>
          )}
        </Flex>
      )}
      </Flex>
     
    </Flex>
  );
}
