import moment from 'moment';
import { useSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';

function Message({item}) {
  const {data:session} = useSession()
  const TypeOfMessage = item._document.data.value.mapValue.fields.user.stringValue === (session ? session.user.email : null) ? Sender : Reciever;
  return (
    <div>
        <TypeOfMessage>
            {item._document.data.value.mapValue.fields.message.stringValue}
            <Timestamp>{item._document.data.value.mapValue.fields.timestamp ? moment(item._document.data.value.mapValue.fields.timestamp.timestampValue).format("LT"):'...'}</Timestamp>
        </TypeOfMessage>
    </div>
  )
}

export default Message

const MessageElement = styled.div`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`;

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;