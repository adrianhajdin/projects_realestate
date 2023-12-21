"use client";
import Image from "next/image";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useState, useEffect } from "react";
import Property from "@/components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}{" "}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize="xl" bg="green.300" color="white">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home() {
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [propertiesForRent, setPropertiesForRent] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyForSale = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
        );
        const propertyForRent = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
        );
        setPropertiesForSale(propertyForSale.hits);
        setPropertiesForRent(propertyForRent.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://blog.pamgolding.co.za/wp-content/uploads/2016/09/helderfontein-banner-1.jpg"
      />
      <Flex flexWrap="wrap">
        {/* fetch the properties and map over them */}
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Selling"
        linkName="/search?purpose=for-rent"
        imageUrl="https://blog.pamgolding.co.za/wp-content/uploads/2016/09/helderfontein-banner-1.jpg"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}
