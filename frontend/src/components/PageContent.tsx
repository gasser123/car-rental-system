import classes from "./PageContent.module.css";
interface Props {
  title: string;
  children?: React.ReactNode;
}
const PageContent: React.FC<Props> = (props) => {
  return (
    <div className={classes.content}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

export default PageContent;
