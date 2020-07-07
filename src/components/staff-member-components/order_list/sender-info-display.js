import React from 'react';
import {
  Delete, ClearRounded, AccountBox, Mail, PhoneIphoneRounded,
} from '@material-ui/icons';

export default function SenderInfoDisplay(props) {
  const { user } = props;
  return (
    <>
      {
        user && (
          <div className="order-sender-info-container">
            <div>
              <AccountBox />
              {` ${user.name}`}
            </div>
            <div>
              <Mail />
              {` ${user.email}`}
            </div>
            <div>
              <PhoneIphoneRounded />
              {` ${user.phoneNumber}`}
            </div>
          </div>
        )
      }
    </>
  );
}
