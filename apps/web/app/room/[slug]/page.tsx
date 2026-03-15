import CanvasRoom from "../../components/CanvasRoom";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return <CanvasRoom slug={params.slug} />;
}
