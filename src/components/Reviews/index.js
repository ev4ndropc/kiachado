import {
    Avatar,
    Flex,
    Icon,
    Img,
    Text
} from "@chakra-ui/react";
import moment from "moment";
import { AiFillStar } from "react-icons/ai";
import Rating from "react-rating";

export default function Reviews({ reviews }) {
    return (
        <Flex flexDir="column">
            {reviews.map(review => (
                <Flex w="100%" flexDir="column">
                    <Flex flexDir="row" alignItems="center" mt={4} mb={2}>
                        <Avatar size="sm" src={review.review_profile_avatar} alt="Shopee logo" />
                        <Text fontSize={14} ml={2}>{review.review_profile_name}</Text>
                    </Flex>
                    <Rating
                        initialRating={Number(parseFloat(review.review_rating).toFixed(1))}
                        emptySymbol={<Icon w={4} h={4} as={AiFillStar} />}
                        fullSymbol={<Icon w={4} h={4} color="yellow.500" as={AiFillStar} />}
                        readonly
                        quiet
                    />
                    <Text mt={-1} mb={2} fontSize={12}>Avaliado em {moment(review.review_date).format('LLL')}</Text>
                    <Text fontSize={14}>{review.review_text}</Text>
                </Flex>
            ))}
        </Flex>
    )
}