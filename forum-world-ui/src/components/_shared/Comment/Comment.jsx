import classes from "./Comment.module.scss";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


const Comment = ({img, nickname, date, comment}) => {
  return (
		<div className={classes.commentWrapper}>
			{img === null ?
				<Avatar icon={<UserOutlined />} /> :
				<Avatar src={<img src={img} alt="avatar" />} />
			}

			<div className={classes.container}>
				<div className={classes.hero}> 
					<p className={classes.nick}>{nickname}</p>
					<p className={classes.date}>{date}</p>
				</div>
				<p className={classes.comment}>{comment}</p>
			</div>
		</div>
	);
};

export default Comment;
