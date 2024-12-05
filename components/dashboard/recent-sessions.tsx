import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const recentSessions = [
  {
    id: 1,
    type: "Miss Universe",
    date: new Date(2024, 2, 25),
    score: 88,
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    type: "General Practice",
    date: new Date(2024, 2, 20),
    score: 85,
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    type: "Miss World",
    date: new Date(2024, 2, 15),
    score: 82,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export function RecentSessions() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Sessions</h3>
      <div className="space-y-4">
        {recentSessions.map((session) => (
          <div key={session.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
            <img
              src={session.thumbnail}
              alt={`Session ${session.id}`}
              className="h-16 w-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium">{session.type}</h4>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(session.date, { addSuffix: true })}
              </p>
            </div>
            <div className="text-2xl font-semibold text-pink-500">{session.score}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}