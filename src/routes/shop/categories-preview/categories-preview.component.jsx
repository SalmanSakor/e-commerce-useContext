import { useContext, Fragment } from "react";
import Loading from "../../../components/loading/loading.component";
import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../../components/shop-item/category-preview/category-preview.component";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).length === 0 && <Loading />}
      <div className="categories-preview-container">
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
      </div>
    </Fragment>
  );
};

export default CategoriesPreview;
