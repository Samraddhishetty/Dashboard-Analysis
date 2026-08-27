import { useEffect, useRef, useState } from "react";
import "./App.css";

const ACCESS_CONTROL_DATA = [
  {
    id: 1,
    category: "NRI",
    subCategory: "Address Update",
    fieldName: "Address",
    accessType: "No Access",
    masking: "XXXX XXXX XXXX XXXX",
  },
  {
    id: 2,
    category: "NRI",
    subCategory: "Address Update",
    fieldName: "Aadhaar Number",
    accessType: "No Access",
    masking: "XXXX XXXX XXXX XXXX",
  },
  {
    id: 3,
    category: "Corporate",
    subCategory: "Stop Check",
    fieldName: "Account Number",
    accessType: "Read Only",
    masking: "XXXX XXXX XXXX XXXX",
  },
  {
    id: 4,
    category: "Corporate",
    subCategory: "Stop Check",
    fieldName: "IFSC Code",
    accessType: "Masked View",
    masking: "XXXX XXXX XXXX XXXX",
  },
  {
    id: 5,
    category: "Retail",
    subCategory: "Account Update",
    fieldName: "Mobile Number",
    accessType: "No Access",
    masking: "XXXX XXXX XXXX",
  },
];

const ROLE_OPTIONS = [
  "Branch Manager",
  "Relationship Manager",
  "Operations Manager",
  "Compliance Officer",
];

const ACCESS_TYPE_OPTIONS = ["Field Level", "View Level", "Role Level"];

const CATEGORY_OPTIONS = ["NRI", "Corporate", "Retail"];

const SUB_CATEGORY_OPTIONS = [
  "Address Update",
  "Stop Check",
  "Account Update",
];

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4.1L11 8h7.5A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-10Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 18c.6-2.6 2.6-4 4.5-4s3.9 1.4 4.5 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M19.5 18c-.3-1.8-1.5-3-3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4.5v1.6M12 17.9v1.6M4.5 12h1.6M17.9 12h1.6M6.4 6.4l1.1 1.1M16.5 16.5l1.1 1.1M17.6 6.4l-1.1 1.1M7.5 16.5l-1.1 1.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.2 1.5H4.8L6 16.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h4l11-11-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m13.5 6.5 4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EmptyIllustration() {
  return (
    <svg className="empty-illustration" viewBox="0 0 360 220" fill="none" aria-hidden="true">
      <circle cx="52" cy="48" r="10" fill="#E8EEF8" />
      <circle cx="318" cy="36" r="6" fill="#D7E3F7" />
      <circle cx="332" cy="168" r="8" fill="#E8EEF8" />
      <path d="M40 170h18M49 161v18" stroke="#C5D4EE" strokeWidth="3" strokeLinecap="round" />
      <path d="M300 86h14M307 79v14" stroke="#C5D4EE" strokeWidth="3" strokeLinecap="round" />
      <rect x="86" y="42" width="188" height="122" rx="10" fill="#E7EDF6" />
      <rect x="96" y="52" width="168" height="96" rx="6" fill="#F7F9FC" />
      <rect x="86" y="164" width="188" height="10" rx="3" fill="#D5DEEC" />
      <rect x="128" y="174" width="104" height="8" rx="2" fill="#C9D4E6" />
      <rect x="112" y="68" width="44" height="58" rx="6" fill="#FFFFFF" stroke="#D5DEEC" />
      <circle cx="134" cy="86" r="8" fill="#C5D4EE" />
      <rect x="120" y="100" width="28" height="5" rx="2.5" fill="#D9E2F0" />
      <rect x="124" y="109" width="20" height="4" rx="2" fill="#E7EDF6" />
      <rect x="158" y="64" width="52" height="66" rx="6" fill="#FFFFFF" stroke="#2F6FED" strokeWidth="1.4" />
      <circle cx="184" cy="86" r="9" fill="#9BB6F0" />
      <rect x="168" y="102" width="32" height="5" rx="2.5" fill="#C5D4EE" />
      <rect x="172" y="111" width="24" height="4" rx="2" fill="#E7EDF6" />
      <rect x="214" y="68" width="44" height="58" rx="6" fill="#FFFFFF" stroke="#D5DEEC" />
      <circle cx="236" cy="86" r="8" fill="#C5D4EE" />
      <rect x="222" y="100" width="28" height="5" rx="2.5" fill="#D9E2F0" />
      <rect x="226" y="109" width="20" height="4" rx="2" fill="#E7EDF6" />
      <circle cx="214" cy="128" r="34" fill="#FFFFFF" fillOpacity="0.55" stroke="#2F6FED" strokeWidth="8" />
      <path d="M238 152 262 176" stroke="#2F6FED" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const [role, setRole] = useState("Branch Manager");
  const [accessType, setAccessType] = useState("Field Level");
  const [categories, setCategories] = useState(["NRI", "Corporate"]);
  const [subCategories, setSubCategories] = useState([
    "Address Update",
    "Stop Check",
  ]);
  const [openMenu, setOpenMenu] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [tableFilter, setTableFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [editAccessType, setEditAccessType] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleValue = (list, value, setter) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  const handleSearch = () => {
    const next = ACCESS_CONTROL_DATA.filter((item) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(item.category);
      const subMatch =
        subCategories.length === 0 ||
        subCategories.includes(item.subCategory);
      return categoryMatch && subMatch;
    });
    setResults(next);
    setHasSearched(true);
    setTableFilter("All");
    setOpenMenu(null);
  };

  const handleClear = () => {
    setRole("");
    setAccessType("");
    setCategories([]);
    setSubCategories([]);
    setResults([]);
    setHasSearched(false);
    setOpenMenu(null);
    setTableFilter("All");
  };

  const visibleRows =
    tableFilter === "All"
      ? results
      : results.filter((row) => row.accessType === tableFilter);

  const openRecord = (record, mode) => {
    setSelectedRecord(record);
    setModalMode(mode);
    setEditAccessType(record.accessType);
  };

  const saveEdit = () => {
    setResults((prev) =>
      prev.map((row) =>
        row.id === selectedRecord.id
          ? { ...row, accessType: editAccessType }
          : row
      )
    );
    setSelectedRecord(null);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <button type="button" className="sidebar-item active" aria-label="Home">
          <IconHome />
        </button>
        <button type="button" className="sidebar-item" aria-label="Apps">
          <IconGrid />
        </button>
        <button type="button" className="sidebar-item" aria-label="Records">
          <IconFolder />
        </button>
        <button type="button" className="sidebar-item" aria-label="Users">
          <IconUsers />
        </button>
        <button type="button" className="sidebar-item" aria-label="Settings">
          <IconSettings />
        </button>
        <button type="button" className="sidebar-item sidebar-search" aria-label="Search">
          <IconSearch size={18} />
        </button>
      </aside>

      <div className="shell">
        <header className="topbar">
          <div className="brand">Logo</div>

          <div className="header-category">
            Category
            <IconChevron />
          </div>

          <div className="header-search">
            <input type="search" placeholder="Search" aria-label="Global search" />
            <IconSearch />
          </div>

          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Apps">
              <IconGrid />
            </button>
            <button type="button" className="icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <button type="button" className="icon-btn" aria-label="Settings">
              <IconSettings />
            </button>
            <div className="avatar" aria-hidden="true">
              BM
            </div>
          </div>
        </header>

        <main className="page">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="crumb-link">Home</span>
            <span className="crumb-sep">›</span>
            <span>Admin</span>
            <span className="crumb-sep">›</span>
            <span>Access Control</span>
          </nav>

          <h1 className="page-title">Maintain Role Level Access Control</h1>

          <section className="card" ref={panelRef}>
            <h2 className="section-title">Search Criteria</h2>

            <div className="filter-grid">
              <div className="field">
                <label htmlFor="role">
                  Role <span className="required">*</span>
                </label>
                <div className="control">
                  <input
                    id="role"
                    value={role}
                    placeholder="Select role"
                    onChange={(event) => setRole(event.target.value)}
                    onFocus={() => setOpenMenu("role")}
                  />
                  <button
                    type="button"
                    className="control-icon"
                    aria-label="Lookup role"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === "role" ? null : "role"
                      )
                    }
                  >
                    <IconSearch />
                  </button>
                  {openMenu === "role" && (
                    <div className="dropdown">
                      {ROLE_OPTIONS.filter((option) =>
                        option.toLowerCase().includes(role.toLowerCase())
                      ).map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={option === role ? "active" : ""}
                          onClick={() => {
                            setRole(option);
                            setOpenMenu(null);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="field">
                <label>
                  Access Control Type <span className="required">*</span>
                </label>
                <button
                  type="button"
                  className="select-trigger"
                  onClick={() =>
                    setOpenMenu((current) =>
                      current === "access" ? null : "access"
                    )
                  }
                >
                  <span className={accessType ? "" : "placeholder"}>
                    {accessType || "Select type"}
                  </span>
                  <IconChevron />
                </button>
                {openMenu === "access" && (
                  <div className="dropdown">
                    {ACCESS_TYPE_OPTIONS.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={option === accessType ? "active" : ""}
                        onClick={() => {
                          setAccessType(option);
                          setOpenMenu(null);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="field">
                <label>Case Category</label>
                <div
                  className="multi-trigger"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setOpenMenu((current) =>
                      current === "category" ? null : "category"
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setOpenMenu((current) =>
                        current === "category" ? null : "category"
                      );
                    }
                  }}
                >
                  <div className="chips">
                    {categories.length === 0 && (
                      <span className="placeholder">Select categories</span>
                    )}
                    {categories.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                        <button
                          type="button"
                          className="chip-remove"
                          aria-label={`Remove ${item}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setCategories((prev) =>
                              prev.filter((value) => value !== item)
                            );
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <IconChevron />
                </div>
                {openMenu === "category" && (
                  <div className="dropdown">
                    {CATEGORY_OPTIONS.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={categories.includes(option) ? "active" : ""}
                        onClick={() =>
                          toggleValue(categories, option, setCategories)
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="field">
                <label>Case Sub-category</label>
                <div
                  className="multi-trigger"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setOpenMenu((current) =>
                      current === "sub" ? null : "sub"
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setOpenMenu((current) =>
                        current === "sub" ? null : "sub"
                      );
                    }
                  }}
                >
                  <div className="chips">
                    {subCategories.length === 0 && (
                      <span className="placeholder">Select sub-categories</span>
                    )}
                    {subCategories.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                        <button
                          type="button"
                          className="chip-remove"
                          aria-label={`Remove ${item}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSubCategories((prev) =>
                              prev.filter((value) => value !== item)
                            );
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <IconChevron />
                </div>
                {openMenu === "sub" && (
                  <div className="dropdown">
                    {SUB_CATEGORY_OPTIONS.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={
                          subCategories.includes(option) ? "active" : ""
                        }
                        onClick={() =>
                          toggleValue(subCategories, option, setSubCategories)
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="actions">
              <button type="button" className="btn-clear" onClick={handleClear}>
                Clear
              </button>
              <button type="button" className="btn-search" onClick={handleSearch}>
                Search
              </button>
            </div>
          </section>

          {!hasSearched ? (
            <section className="card empty-card">
              <EmptyIllustration />
            </section>
          ) : (
            <section className="card results-card">
              <div className="results-header">
                <h2 className="section-title">Access Controls</h2>
                <div className="table-filter">
                  <button
                    type="button"
                    className="icon-btn filter-btn"
                    aria-label="Filter results"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === "tableFilter" ? null : "tableFilter"
                      )
                    }
                  >
                    <IconFilter />
                  </button>
                  {openMenu === "tableFilter" && (
                    <div className="dropdown dropdown-right">
                      {["All", "No Access", "Read Only", "Masked View"].map(
                        (option) => (
                          <button
                            type="button"
                            key={option}
                            className={option === tableFilter ? "active" : ""}
                            onClick={() => {
                              setTableFilter(option);
                              setOpenMenu(null);
                            }}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {visibleRows.length === 0 ? (
                <p className="no-rows">No access controls match the selected filters.</p>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Case Category</th>
                        <th>Case Sub-category</th>
                        <th>Field Name</th>
                        <th>Access Type</th>
                        <th>Masking Preview</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.map((row) => (
                        <tr key={row.id}>
                          <td>{row.category}</td>
                          <td>{row.subCategory}</td>
                          <td>{row.fieldName}</td>
                          <td>{row.accessType}</td>
                          <td className="masking">{row.masking}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                type="button"
                                className="row-icon"
                                title="View"
                                onClick={() => openRecord(row, "view")}
                              >
                                <IconEye />
                              </button>
                              <button
                                type="button"
                                className="row-icon"
                                title="Edit"
                                onClick={() => openRecord(row, "edit")}
                              >
                                <IconEdit />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {selectedRecord && (
        <div className="modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3 id="modal-title">
                {modalMode === "edit"
                  ? "Edit Access Control"
                  : "Access Control Details"}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedRecord(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-row">
                <span>Case Category</span>
                <strong>{selectedRecord.category}</strong>
              </div>
              <div className="modal-row">
                <span>Case Sub-category</span>
                <strong>{selectedRecord.subCategory}</strong>
              </div>
              <div className="modal-row">
                <span>Field Name</span>
                <strong>{selectedRecord.fieldName}</strong>
              </div>
              <div className="modal-row">
                <span>Access Type</span>
                {modalMode === "edit" ? (
                  <select
                    value={editAccessType}
                    onChange={(event) => setEditAccessType(event.target.value)}
                  >
                    <option>No Access</option>
                    <option>Read Only</option>
                    <option>Masked View</option>
                    <option>Full Access</option>
                  </select>
                ) : (
                  <strong>{selectedRecord.accessType}</strong>
                )}
              </div>
              <div className="modal-row">
                <span>Masking Preview</span>
                <strong className="masking">{selectedRecord.masking}</strong>
              </div>
            </div>
            {modalMode === "edit" && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={() => setSelectedRecord(null)}
                >
                  Cancel
                </button>
                <button type="button" className="btn-search" onClick={saveEdit}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
