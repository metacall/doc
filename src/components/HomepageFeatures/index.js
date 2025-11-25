import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: "Introduction",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Get a quick introduction to MetaCall, how to install it and what all can
        you do with it.
      </>
    ),
    goto: "/docs/category/introduction/",
  },
  {
    title: "Using MetaCall",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Installed MetaCall? Great, now learn how to create new projects or
        integrate MetaCall in your existing projects.
      </>
    ),
    goto: "/docs/category/using-metacall/",
  },
  {
    title: "Tutorials",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Learn from existing tutorials on how to use MetaCall in different
        scenarios.
      </>
    ),
    goto: "/docs/category/tutorials",
  },
];

function Feature({ Svg, title, description, goto }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={goto}>
          <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
