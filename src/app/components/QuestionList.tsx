import { Question } from "@/types/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

import { headers } from "next/headers";
import DeleteButton from "./DeleteButton";

const QuestionList = async ({ questions}: { questions: Question } ) => {
  const { getPermission } = getKindeServerSession();
  const requiredPermission = await getPermission("delete:question");

  const headersList = await headers();
  // const header_url = headersList.get('x-url') || "";
  const pathname = headersList.get("x-pathname");
  // const origin_url = headersList.get('x-origin');

  return (
    <div className="flex flex-col gap-y-3">
      {questions.length
        ? questions?.map((q) => {
            const path = pathname == "/" ? "" : "/";
            return (
              <Link
                href={path}
                key={q.id}
                className={`p-4 flex gap-3 border-b border-slate-300 transition-colors 
                  ${pathname == "/" ? "cursor-default"
                  : "cursor-pointer hover:bg-slate-100"}
                `}
              >
                {/* Profil Pengguna */}
                {q.user?.picture && (
                  <img
                    src={`${q.user.picture}`}
                    alt={`${q.user.firstname} profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}

                {/* Konten Komentar */}
                <div className="flex-1">
                  {/* Nama dan Komentar */}
                  <div className="bg-slate-100 rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-700">
                      {q.user?.firstname} {q.user?.lastname}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">{q.question}</p>
                  </div>

                  {/* Waktu dan Aksi */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span>
                      {new Date(q.createdAt).toLocaleString("en-US", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>
                    <button className="text-blue-500 hover:underline">
                      Like
                    </button>
                    <button className="text-blue-500 hover:underline">
                      Reply
                    </button>
                  </div>
                </div>

                {/* Tombol Hapus (Opsional, untuk admin atau pemilik komentar) */}
                {requiredPermission?.isGranted && pathname !== "/" &&(
                  <DeleteButton id={q.id} />
                )}
              </Link>
            );
          })
        : "no questions available"}
    </div>
  );
};

export default QuestionList;
