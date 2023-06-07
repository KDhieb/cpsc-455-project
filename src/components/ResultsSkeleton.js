import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function ResultsSkeleton({ loading = true, num = 8 }) {
  const cards = Array.from(new Array(num)).map((_, index) => {});
  return (
    <Card sx={{ maxWidth: 600, m: 2, margin: "auto" }}>
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
              <IconButton style={{ color: "light-gray" }} aria-label='favorite'>
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
  );
}
