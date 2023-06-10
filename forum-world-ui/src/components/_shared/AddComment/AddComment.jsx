import classes from "./AddComment.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useState } from "react";

const AddComment = ({ img }) => {
	
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={classes.commentWrapper}>
      {img === null ? (
        <Avatar icon={<UserOutlined />} />
      ) : (
        <Avatar src={<img src={img} alt="avatar" />} />
      )}
      <div className={classes.right}>
        <p className={classes.nick}>Гость</p>
        <textarea
          className={classes.comment}
          placeholder="Введите текст комментария"
          maxLength={1000}
          value={text}
          onChange={handleChange}
        />
        <div className={classes.bottom}>
          <Button type="primary">Добавить</Button>
          <p>{text.length}/1000</p>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
