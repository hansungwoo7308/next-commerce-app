import ProductReview from "@/components/product/ProductReview";
import { setSelectedProductId } from "lib/client/store/productManagerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface Props {
  product: any;
  reviews: [];
}

export default function ProductReviews({ product, reviews }: Props) {
  const dispatch = useDispatch();
  const { selectedProductId, selectedProductReviewIds } = useSelector(
    (store: any) => store.productManager
  );

  useEffect(() => {
    if (selectedProductReviewIds.length === 0) dispatch(setSelectedProductId(null));
    else if (selectedProductReviewIds.length === 1) dispatch(setSelectedProductId(product._id));
  }, [selectedProductReviewIds]);

  return (
    <Box className="reviews">
      {reviews.map((review: any) => (
        <ProductReview product={product} review={review} key={review._id} />
      ))}
    </Box>
  );
}

const Box = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
