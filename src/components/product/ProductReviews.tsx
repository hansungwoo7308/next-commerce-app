import ProductReview from "@/components/product/ProductReview";
import styled from "styled-components";

interface Props {
  reviews: [];
}

export default function ProductReviews({ reviews }: Props) {
  return (
    <Box className="reviews">
      {reviews.map((review: any) => (
        <ProductReview review={review} />
      ))}
    </Box>
  );
}

const Box = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
