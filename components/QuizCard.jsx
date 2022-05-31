import { Card, Image } from "@mantine/core";

export const QuizCard = ({ imgurl }) => {
  return (
    <Card shadow="sm" p="lg" withBorder={true}>
      <Card.Section style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Image
          src={imgurl}
          style={{
            paddingLeft: 80,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          height={200}
          width={200}
          alt="Norway"
        />
      </Card.Section>
    </Card>
  );
};
