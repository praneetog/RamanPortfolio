export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs text-slate-600 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Raman. All rights reserved. (Or whatever.)
        </div>
      </div>
    </footer>
  );
}
