import { user } from "../hooks/useGetUsers.hook";
import { forwardRef } from "react";

import "./User.css";

interface userProps {
  user: user;
  key: string;
}

const User = forwardRef<any, userProps>((props: userProps, ref) => {
  return (
    <div ref={ref} data-testid="user_component" className="user__component">
      <picture>
        <source
          media="(max-width:500px)"
          srcSet={props.user.picture.thumbnail}
        />
        <source media="(max-width:800px)" srcSet={props.user.picture.medium} />
        <img className="user__img" src={props.user.picture.large} />
      </picture>
      <div className="user__info">
        <h1>{props.user.name.first + "  " + props.user.name.last}</h1>
        <span>{props.user.email}</span>
        <span>{props.user.gender}</span>
        <span>{props.user.dob.age}</span>
      </div>
    </div>
  );
});

export default User;
