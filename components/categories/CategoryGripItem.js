import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryGripItem = ({ category }) => {
  const [subs, setSubs] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleViewMore = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setSubs(toggle ? category.subs : category.subs.slice(0, 5));
  }, [toggle]);

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-lg  py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4 ">
        <div className="card-body p-1">
          <Link href="/categories/[slug]" as={`/categories/${category.slug}`}>
            <a>
              <h2 className="h5">{category.name}</h2>
            </a>
          </Link>

          <ul className="list-unstyled fs-sm mb-0">
            {subs.map((sub) => (
              <li
                className="d-flex align-items-center justify-content-between"
                key={sub._id}
              >
                <Link
                  href="/categories/subs/[slug]"
                  as={`/categories/subs/${sub.slug}`}
                >
                  <a className="nav-link-style">
                    <i className="fas fa-arrow-right-circle me-2" />
                    {sub.name}
                  </a>
                </Link>
                {/* <span className="fs-ms text-muted">0</span> */}
              </li>
            ))}
            <li>
              <hr />
            </li>
            {category.subs.length > 5 && (
              <li className="d-flex align-items-center justify-content-between">
                <a className="nav-link-style" onClick={handleViewMore}>
                  <i className="fas fa-arrow-right me-2" />
                  View more
                </a>
                {/* <span className="fs-ms text-muted">0</span> */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryGripItem;
