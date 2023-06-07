import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function ResultsSkeleton({
  loading = true,
  numberOfRows = 7,
  displayText,
}) {
  const cards = Array.from(new Array(numberOfRows)).map((_, index) => {});
  return (
    <>
      <Card sx={{ maxWidth: 600, m: 2, margin: "auto" }}>
        <CardHeader
          avatar={
            displayText ? (
              <p style={{ textAlign: "center" }}>{displayText}</p>
            ) : (
              <Skeleton
                animation='wave'
                variant='text'
                width={100}
                height={20}
              />
            )
          }
        />
        {cards.map((_, index) => {
          return (
            <CardHeader
              key={index}
              avatar={
                <Skeleton
                  animation='wave'
                  variant='square'
                  width={40}
                  height={40}
                />
              }
              action={
                <IconButton
                  style={{ color: "light-gray" }}
                  aria-label='favorite'
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              }
              title={
                <>
                  <Skeleton
                    animation='wave'
                    height={10}
                    width='95%'
                    style={{ marginBottom: 6 }}
                  />
                </>
              }
              subheader={<Skeleton animation='wave' height={10} width='50%' />}
            />
          );
        })}
      </Card>
    </>
  );
}
