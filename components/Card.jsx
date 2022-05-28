import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
export const PokeCard = ({ imgurl, link }) => {
  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Link href={link}>
          <a>
            <Image src={imgurl} height={250} alt="Norway" />
          </a>
        </Link>
      </Card.Section>
      <Group position="apart" style={{ marginBottom: 5, marginTop: 6 }}>
        <Text weight={500}>Norway Fjord Adventuresa</Text>
        <Badge color="pink" variant="light">
          GET IT!
        </Badge>
      </Group>
      <Text size="sm" style={{ color: "black", lineHeight: 1.5 }}>
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Book classic tour now
      </Button>
    </Card>
  );
};
