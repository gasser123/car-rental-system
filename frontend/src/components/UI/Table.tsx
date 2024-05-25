import classes from "./Table.module.css";
interface Props {
  children: React.ReactNode;
}

const Table: React.FC<Props> = (props)=>{
 return <table className={classes.table}>{props.children}</table>

}

export default Table;
