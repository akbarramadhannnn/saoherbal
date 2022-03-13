import { GeneratePrefixUrl } from "../../../utils/generate";

export const MenuDashboard = position => {
  return [
    {
      name: "Dashboard",
      icon: "bx bx-home-circle",
      link: `${GeneratePrefixUrl(position)}/dashboard`,
      sub: [],
    },
  ];
};

export const MenuMaster = position => {
  return [
    {
      name: "Master",
      icon: "bx bx-data",
      link: "",
      sub: [
        {
          name: "Kategori",
          link: `${GeneratePrefixUrl(position)}/master/category`,
        },
        {
          name: "Varian",
          link: `${GeneratePrefixUrl(position)}/master/variant`,
        },
        {
          name: "Produk",
          link: `${GeneratePrefixUrl(position)}/master/product`,
        },
        {
          name: "Karyawan",
          link: `${GeneratePrefixUrl(position)}/master/employee`,
        },
      ],
    },
  ];
};

export const MenuKonsumen = position => {
  return [
    {
      name: "Konsumen",
      icon: "bx bx-store",
      link: "",
      sub: [
        {
          name: "Distributor",
          link: `${GeneratePrefixUrl(position)}/konsumen/distributor`,
        },
        {
          name: "Toko",
          link: `${GeneratePrefixUrl(position)}/konsumen/toko`,
        },
      ],
    },
  ];
};

export const MenuBiaya = position => {
  return [
    {
      name: "Biaya",
      icon: "bx bx-money",
      link: "",
      sub: [
        {
          name: "Biaya Produksi",
          link: `${GeneratePrefixUrl(position)}/biaya/produksi`,
        },
        {
          name: "Biaya Operasional",
          link: `${GeneratePrefixUrl(position)}/biaya/operasional`,
        },
      ],
    },
  ];
};

export const MenuTransaction = position => {
  return [
    {
      name: "Transaksi",
      icon: "bx bx-cart-alt",
      link: `${GeneratePrefixUrl(position)}/transaction`,
      sub: [],
    },
  ];
};

export const MenuConfigure = position => {
  return [
    {
      name: "Konfigurasi",
      icon: "bx bx-cog",
      link: `${GeneratePrefixUrl(position)}/configure`,
      sub: [],
    },
  ];
};
