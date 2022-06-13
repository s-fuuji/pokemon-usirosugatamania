import { Card, Image } from "@mantine/core";
import React from 'react'

type Props = {
  imgUrl: string,
  onClick: VoidFunction
}

export const QuizCard: React.FC<Props> = (
  { imgUrl, onClick }) => {
  return (
    <Card
      shadow="sm"
      p="lg"
      withBorder={true}
      onClick={onClick}
      className="bg-red-500"
    >
      <Card.Section style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Image
          className="bg-card-back bg-cover w-96 pl-24"
          src={imgUrl}
          height={200}
          width={200}
          alt="読み込み中"
        />
      </Card.Section>
    </Card>
  );
};
