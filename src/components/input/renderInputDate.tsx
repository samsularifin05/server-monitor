import { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

// Helper
function toLocalDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface DatePickerProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  range?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

export default function DatePicker<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  label,
  placeholder = "YYYY-MM-DD ~ YYYY-MM-DD",
  range = false,
  required = false,
  readOnly = false,
  className = "",
}: DatePickerProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [showMonthList, setShowMonthList] = useState(false);
  const [showYearList, setShowYearList] = useState(false);

  // visible year range state (start = newest year, end = oldest year shown)
  const nowYear = new Date().getFullYear();
  const INITIAL_START = nowYear;
  const INITIAL_END = nowYear - 19; // show 20 years by default

  const [visibleStartYear, setVisibleStartYear] = useState(INITIAL_START);
  const [visibleEndYear, setVisibleEndYear] = useState(INITIAL_END);

  const yearListRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Dapatkan daftar hari dalam bulan
  const getDaysInMonth = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    const firstDay = start.getDay();
    for (let i = 0; i < firstDay; i++) {
      const prev = new Date(start);
      prev.setDate(start.getDate() - (firstDay - i));
      days.push({ date: prev, isCurrentMonth: false });
    }

    for (let i = 1; i <= end.getDate(); i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        isCurrentMonth: true,
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const next = new Date(date.getFullYear(), date.getMonth() + 1, i);
      days.push({ date: next, isCurrentMonth: false });
    }

    return days;
  };

  // Tutup popup jika klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const [startDate, endDate] = range
          ? field.value?.split("~").map((d: string) => d.trim()) ?? [null, null]
          : [field.value, null];

        const displayValue = range
          ? startDate && endDate
            ? `${startDate} ~ ${endDate}`
            : ""
          : startDate || "";

        // Fungsi pilih tanggal
        const handleSelect = (date: string) => {
          if (!range) {
            field.onChange(date);
            setOpen(false);
          } else {
            if (!startDate) field.onChange(date);
            else if (!endDate) {
              const start = new Date(startDate);
              const selected = new Date(date);
              const value =
                selected >= start
                  ? `${startDate} ~ ${date}`
                  : `${date} ~ ${startDate}`;
              field.onChange(value);
              setOpen(false);
            } else {
              field.onChange(date);
              setHoverDate(null);
            }
          }
        };

        const isInRange = (dateStr: string) => {
          if (!range || !startDate) return false;
          const start = new Date(startDate);
          const end = endDate
            ? new Date(endDate)
            : hoverDate
            ? new Date(hoverDate)
            : null;
          if (!end) return false;
          const date = new Date(dateStr);
          return (
            (date >= start && date <= end) || (date <= start && date >= end)
          );
        };

        const isRangeStart = (d: string) => startDate === d;
        const isRangeEnd = (d: string) => endDate === d;

        // ===================== Calendar renderer =====================
        const renderCalendar = (monthOffset = 0) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + monthOffset,
            1
          );
          const days = getDaysInMonth(date);
          const monthName = date
            .toLocaleString("en-US", { month: "short" })
            .toUpperCase();
          const year = date.getFullYear();
          const today = toLocalDateString(new Date());

          // buat daftar tahun visible dari visibleStartYear turun ke visibleEndYear
          const visibleYears = Array.from(
            { length: visibleStartYear - visibleEndYear + 1 },
            (_, i) => visibleStartYear - i
          ).filter((y) => y >= 1900);

          const hasMoreYears = visibleEndYear > 1900;

          return (
            <div className="flex-1 transition-all duration-200">
              {/* Header */}
              <div className="flex justify-between items-center mb-3 px-1">
                {monthOffset === 0 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-md"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                ) : (
                  <div className="w-7" />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMonthList((prev) => !prev);
                      setShowYearList(false);
                    }}
                    className="text-sm font-semibold text-gray-700 hover:text-gold-600"
                  >
                    {monthName}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowYearList((prev) => !prev);
                      setShowMonthList(false);
                    }}
                    className="text-sm text-gray-500 hover:text-gold-600"
                  >
                    {year}
                  </button>
                </div>

                {monthOffset === 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-md"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                ) : (
                  <div className="w-7" />
                )}
              </div>

              {/* CONTENT */}
              {showMonthList ? (
                <>
                  <div className="flex justify-center text-sm mb-2">BULAN</div>

                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const label = new Date(0, i).toLocaleString("id-ID", {
                        month: "short",
                      });
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCurrentMonth(new Date(date.getFullYear(), i, 1));
                            setShowMonthList(false);
                          }}
                          className={`h-11 cursor-pointer text-sm rounded-md transition-all ${
                            i === date.getMonth()
                              ? "bg-gold-600 text-white font-semibold shadow-sm"
                              : "hover:bg-gold-100 text-gray-700"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : showYearList ? (
                <div>
                  <div className="flex justify-center text-sm mb-2">TAHUN</div>
                  <div
                    ref={yearListRef}
                    className="grid grid-cols-4 gap-2 mb-2 max-h-60 overflow-y-auto scroll-smooth pr-2"
                  >
                    {visibleYears.map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => {
                          setCurrentMonth(new Date(y, date.getMonth(), 1));
                          setShowYearList(false);
                        }}
                        className={`h-11 text-sm cursor-pointer rounded-md transition-all ${
                          y === date.getFullYear()
                            ? "bg-gold-600 text-white font-semibold shadow-sm"
                            : "hover:bg-gold-100 text-gray-700"
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3">
                    {hasMoreYears && (
                      <button
                        type="button"
                        onClick={() => {
                          // turunkan visibleEndYear 20 langkah (lebih tua)
                          setVisibleEndYear((prev) => {
                            const nextEnd = Math.max(1900, prev - 20);
                            // setelah state update, scroll ke bawah
                            setTimeout(() => {
                              if (yearListRef.current) {
                                yearListRef.current.scrollTo({
                                  top: yearListRef.current.scrollHeight,
                                  behavior: "smooth",
                                });
                              }
                            }, 80);
                            return nextEnd;
                          });
                        }}
                        className="text-sm cursor-pointer text-gold-600 hover:underline"
                      >
                        Tampilkan lebih banyak
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setVisibleStartYear(INITIAL_START);
                        setVisibleEndYear(INITIAL_END);
                        // scroll ke atas supaya cepat ke awal
                        setTimeout(() => {
                          if (yearListRef.current) {
                            yearListRef.current.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }
                        }, 80);
                      }}
                      className="text-sm cursor-pointer text-gray-500 hover:text-gold-600 hover:underline"
                    >
                      Kembali ke tahun sekarang
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Weekdays */}
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs text-gray-500">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, idx) => {
                      const iso = toLocalDateString(day.date);
                      const isSelected = isRangeStart(iso) || isRangeEnd(iso);
                      const inRange = isInRange(iso);
                      const isToday = today === iso;

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={!day.isCurrentMonth}
                          onMouseEnter={() =>
                            range && startDate && !endDate && setHoverDate(iso)
                          }
                          onMouseLeave={() => range && setHoverDate(null)}
                          onClick={() =>
                            day.isCurrentMonth && handleSelect(iso)
                          }
                          className={`h-11 w-11 cursor-pointer text-sm font-medium rounded-lg transition-all ${
                            !day.isCurrentMonth
                              ? "text-gray-300"
                              : "hover:bg-yellow-400/70 hover:ring-2 hover:ring-yellow-500 text-gray-700"
                          } ${
                            inRange && !isSelected
                              ? "bg-gold-100"
                              : isSelected
                              ? "bg-gold-600 text-white shadow-sm scale-105"
                              : ""
                          } ${
                            isToday && !isSelected ? "ring-2 ring-gold-300" : ""
                          }`}
                        >
                          {day.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        };

        // ===================== RENDER UI =====================
        return (
          <div className="relative w-full" ref={ref}>
            {label && (
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            <div className="relative">
              <input
                type="text"
                readOnly
                value={displayValue}
                placeholder={placeholder}
                onClick={() => !readOnly && setOpen(!open)}
                className={`w-full px-4 py-3 pr-20 border rounded-lg outline-none transition-all
                ${
                  fieldState.error
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-100"
                }
                ${
                  readOnly
                    ? "bg-gray-50 cursor-not-allowed"
                    : "bg-white cursor-pointer"
                } ${className}`}
              />

              <div className="absolute right-3 inset-y-0 flex items-center gap-1">
                {displayValue && !readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      field.onChange("");
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X size={16} />
                  </button>
                )}
                <Calendar size={18} className="text-gray-400" />
              </div>
            </div>

            {open && (
              <div
                style={{ width: range ? "800px" : "400px" }}
                className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top"
              >
                <div className="flex gap-8 p-6">
                  {range ? (
                    <>
                      {renderCalendar(0)}
                      {renderCalendar(1)}
                    </>
                  ) : (
                    renderCalendar(0)
                  )}
                </div>
              </div>
            )}

            {fieldState.error && (
              <p className="mt-1.5 text-sm text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
