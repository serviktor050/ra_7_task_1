import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

function DateTime(props) {
  return <p className="date">{props.timeDifference}</p>;
}

function withDate(Component) {
  return function (props) {
    let timeDifference = moment(props.date, "YYYY-MM-DD LTS").fromNow();

    if (
      timeDifference.includes("день") ||
      timeDifference.includes("дней") ||
      timeDifference.includes("год") ||
      timeDifference.includes("лет")
    ) {
      timeDifference = "X дней назад";
    } else if (timeDifference.includes("час")) {
      timeDifference = "5 часов назад";
    } else if (timeDifference.includes("минут")) {
      timeDifference = "12 минут назад";
    }

    return <Component timeDifference={timeDifference} />;
  };
}

const DateTimePretty = withDate(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url:
        "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      url:
        "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-03-03 12:10:00",
    },
    {
      url:
        "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url:
        "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url:
        "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url:
        "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
