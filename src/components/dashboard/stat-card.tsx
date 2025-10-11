export const StatCard = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: string;
  value: string;
}) => (
  <div className="bg-[#0d0816]/80 border border-[#302f48]/50 rounded-[12px] p-[24px] flex flex-col gap-[6px] shadow-[0_0_8px_#00000040]">
    <p className="text-[14px] font-medium text-[#c8bdf9cc]">{label}</p>
    <div className="flex items-center gap-[8px]">
      <span className="text-[1.8rem]">{icon}</span>
      <p className="text-[1.8rem] font-bold">{value}</p>
    </div>
  </div>
);