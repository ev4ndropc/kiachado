import { useRouter } from "next/router";
import {
    Avatar,
    Button,
    Divider,
    Flex,
    Icon,
    Img,
    Text,
    useToast
} from "@chakra-ui/react";
import moment from "moment";
import 'moment/locale/pt-br'
import { AiFillStar } from "react-icons/ai";
import Rating from "react-rating";
import parse from 'html-react-parser';
import { BsFillTrash2Fill } from "react-icons/bs";
import { useState } from "react";

export default function Reviews({ reviews }) {
    const token = localStorage.getItem('token')
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const toast = useToast()
    const [reviewsData, setReviewsData] = useState(reviews)

    const handleDeleteReview = async (review) => {
        setIdToDelete(review.id)
        setIsLoading(true)
        try {
            const response = await fetch('/api/reviews/delete?review_id=' + review.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const json = await response.json()
            if (json.ok) {
                var newReviews = reviewsData.filter((item, index) => index !== reviewsData.indexOf(review))
                if (newReviews.length === 0) {
                    setReviewsData([])
                    window.location.reload()
                } else {
                    setReviewsData(newReviews)
                    toast({
                        title: 'Sucesso',
                        description: 'Avaliação deletada com sucesso!',
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                    })
                }
            } else {
                toast({
                    title: 'Erro',
                    description: json.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            }
        } catch (error) {
            toast({
                title: 'Erro',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

        setIsLoading(false)
        setIdToDelete(null)
    }


    return (
        <Flex flexDir="column">
            {reviewsData.map((review, index) => (
                <>
                    <Flex key={index} w="100%" flexDir="column">
                        <Flex flexDir="row" justifyContent="space-between" mb={1}>
                            <Flex flexDir="row">
                                <Avatar size="sm" src={review.review_profile_avatar} alt="Shopee logo" />
                                <Text display="flex" alignItems="center" fontSize={14} ml={2}>{review.review_profile_name}</Text>
                            </Flex>
                            {router.pathname === '/admin/produtos' &&
                                <Button
                                    leftIcon={<Icon as={BsFillTrash2Fill} />}
                                    onClick={(e) => handleDeleteReview(review)}
                                    size="sm"
                                    colorScheme="red"
                                    className="delete-button"
                                    isLoading={isLoading ? idToDelete === review.id : false}
                                    loadingText="Deletando..."
                                >
                                    Deletar
                                </Button>
                            }
                        </Flex>
                        <Rating
                            initialRating={Number(parseFloat(review.review_rating).toFixed(1))}
                            emptySymbol={<Icon w={4} h={4} as={AiFillStar} />}
                            fullSymbol={<Icon w={4} h={4} color="yellow.500" as={AiFillStar} />}
                            readonly
                            quiet
                        />
                        <Text mt={1} mb={2} fontSize={12}>Avaliado em {moment(review.created_at).format('DD [de] MMMM [de] YYYY')}</Text>
                        <Flex fontSize={14}>{parse(review.review_text)}</Flex>
                    </Flex>
                    <Divider my={4} />
                </>
            ))}
        </Flex>
    )
}