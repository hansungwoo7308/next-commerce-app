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
  // exteranl
  const dispatch = useDispatch();
  const { selectedProductReviewIds } = useSelector((store: any) => store.productManager);

  useEffect(() => {
    if (selectedProductReviewIds.length === 0) dispatch(setSelectedProductId(null));
    else if (selectedProductReviewIds.length === 1) dispatch(setSelectedProductId(product._id));
  }, [selectedProductReviewIds, dispatch]);

  return (
    <Box className="product-reviews">
      {reviews.map((review: any) => (
        <ProductReview product={product} review={review} key={review._id} />
      ))}
    </Box>
  );
}

const Box = styled.ul`
  display: flex;
  /* flex-direction: column; */
  flex-direction: column-reverse;
  gap: 1rem;
`;
