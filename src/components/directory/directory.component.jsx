import { Fragment } from "react";
import DirectoryItem from "./directory-item/directory-item.component";
import Data from "./categories";
import "./directory.styles.scss";

const Directory = () => {
  return (
    <Fragment>
      <div className="directory-container">
        {Data.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
      </div>
      <h1 className="directory-footer">create by salman sakor</h1>
    </Fragment>
  );
};

export default Directory;
