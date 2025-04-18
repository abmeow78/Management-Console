import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogIn,
    ShoppingCart,
    AlertTriangle,
    CheckCircle,
    Loader2,
    BarChart,
    File,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Search,
    Plus,
    Edit,
    Trash2,
    Save,
    XCircle,
    List,
    GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from 'sonner';

// ===============================
// Dummy Data and Types
// ===============================

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

const initialUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer', status: 'inactive' },
    { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Editor', status: 'pending' },
    { id: '5', name: 'Mike Davis', email: 'mike.davis@example.com', role: 'Admin', status: 'active' },
];

const initialProducts: Product[] = [
    { id: '1', name: 'Product A', description: 'Description of Product A', price: 25.99, category: 'Electronics', stock: 100 },
    { id: '2', name: 'Product B', description: 'Description of Product B', price: 19.99, category: 'Clothing', stock: 50 },
    { id: '3', name: 'Product C', description: 'Description of Product C', price: 49.99, category: 'Home Goods', stock: 20 },
    { id: '4', name: 'Product D', description: 'Description of Product D', price: 12.50, category: 'Books', stock: 150 },
    { id: '5', name: 'Product E', description: 'Description of Product E', price: 79.00, category: 'Electronics', stock: 30 },
];

// Dummy data for sidebar items
const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'products', label: 'Products', icon: ShoppingCart, path: '/products' },
    { id: 'reports', label: 'Reports', icon: BarChart, path: '/reports' },
    { id: 'documents', label: 'Documents', icon: File, path: '/documents' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'login', label: 'Login', icon: LogIn, path: '/login' },
];

// ===============================
// Sub-Components
// ===============================

// InfoCard component for dashboard
const InfoCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 shadow-md">
        {icon}
        <div>
            <h4 className="text-sm font-medium text-gray-400">{title}</h4>
            <p className="text-xl font-semibold text-gray-200">{value}</p>
        </div>
    </div>
);

// ActivityItem component for recent activity
const ActivityItem = ({ type, text }: { type: 'success' | 'warning' | 'error', text: string }) => {
    let Icon = CheckCircle;
    let colorClass = 'text-green-400';

    if (type === 'warning') {
        Icon = AlertTriangle;
        colorClass = 'text-yellow-400';
    } else if (type === 'error') {
        Icon = AlertTriangle;
        colorClass = 'text-red-400';
    }

    return (
        <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${colorClass}`} />
            <span className={`text-sm ${type === 'error' ? 'text-red-300' : 'text-gray-300'}`}>{text}</span>
        </div>
    );
};

// ===============================
// Content Components
// ===============================

const DashboardContent = () => {
    const [loading, setLoading] = useState(false);

    // Simulate loading data
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulate a 1.5 second loading time
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Dashboard</h2>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InfoCard title="Total Users" value="1,234" icon={<Users className="w-6 h-6 text-blue-400" />} />
                        <InfoCard title="Total Products" value="5,678" icon={<ShoppingCart className="w-6 h-6 text-green-400" />} />
                        <InfoCard title="Sales" value="$98,765" icon={<BarChart className="w-6 h-6 text-purple-400" />} />
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Recent Activity</h3>
                        <ul className="space-y-2">
                            <ActivityItem type="success" text="User John Doe logged in" />
                            <ActivityItem type="warning" text="Low stock alert for Product X" />
                            <ActivityItem type="error" text="Failed payment transaction" />
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

const UsersContent = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [editUser, setEditUser] = useState<User | null>(null);
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
        name: '',
        email: '',
        role: 'Viewer',
        status: 'inactive',
    });
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Track selected user IDs
    const [isDeleteMultipleDialogOpen, setIsDeleteMultipleDialogOpen] = useState(false);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user: User) => {
        setEditUser(user);
    };

    const handleSave = (id: string) => {
        setUsers(users.map(u => (u.id === id ? { ...editUser!, id: id } : u)));
        setEditUser(null);
        toast.success("User updated successfully!");
    };

    const handleCancel = () => {
        setEditUser(null);
    };

    const handleDelete = (id: string) => {
        setUsers(users.filter(u => u.id !== id));
        toast.success("User deleted successfully!");
    };

    const handleAddUser = () => {
        if (!newUser.name.trim() || !newUser.email.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }
        const createdUser: User = {
            id: crypto.randomUUID(),
            ...newUser,
        };
        setUsers([...users, createdUser]);
        setNewUser({ name: '', email: '', role: 'Viewer', status: 'inactive' }); // Reset form
        setIsAddUserDialogOpen(false);
        toast.success("User added successfully!");
    };

    const handleCheckboxChange = (userId: string) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDeleteSelected = () => {
        if (selectedUsers.length === 0) {
            toast.error("Please select users to delete.");
            return;
        }
        setIsDeleteMultipleDialogOpen(true);
    };

    const confirmDeleteSelected = () => {
        setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]); // Clear selection
        setIsDeleteMultipleDialogOpen(false); // Close dialog
        toast.success("Selected users deleted successfully!");
    };

    const cancelDeleteSelected = () => {
        setIsDeleteMultipleDialogOpen(false);
    };

    const allSelected = filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length;
    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user) => user.id));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Users</h2>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs bg-gray-800 border-gray-700 text-gray-200"
                />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleDeleteSelected}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border-red-500/30"
                        disabled={selectedUsers.length === 0}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                    </Button>
                    <Button
                        onClick={() => setIsAddUserDialogOpen(true)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/30"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                </div>
            </div>

            {/* User Table */}
            <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-800/50">
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead> {/* Checkbox column */}
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Email</TableHead>
                            <TableHead className="text-gray-300">Role</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-right text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-800/50 transition-colors">
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                        className="h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-gray-200">
                                    {editUser?.id === user.id ? (
                                        <Input
                                            type="text"
                                            value={editUser.name}
                                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editUser?.id === user.id ? (
                                        <Input
                                            type="email"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editUser?.id === user.id ? (
                                        <Select
                                            value={editUser.role}
                                            onValueChange={(value) => setEditUser({ ...editUser, role: value })}
                                        >
                                            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="Admin" className="hover:bg-gray-700/50 text-gray-200">Admin</SelectItem>
                                                <SelectItem value="Editor" className="hover:bg-gray-700/50 text-gray-200">Editor</SelectItem>
                                                <SelectItem value="Viewer" className="hover:bg-gray-700/50 text-gray-200">Viewer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        user.role
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editUser?.id === user.id ? (
                                        <Select
                                            value={editUser.status}
                                            onValueChange={(value) =>
                                                setEditUser({ ...editUser, status: value as 'active' | 'inactive' | 'pending' })
                                            }
                                        >
                                            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="active" className="hover:bg-gray-700/50 text-gray-200">Active</SelectItem>
                                                <SelectItem value="inactive" className="hover:bg-gray-700/50 text-gray-200">Inactive</SelectItem>
                                                <SelectItem value="pending" className="hover:bg-gray-700/50 text-gray-200">Pending</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <span
                                            className={cn(
                                                'px-2 py-1 rounded',
                                                user.status === 'active' && 'bg-green-500/20 text-green-400',
                                                user.status === 'inactive' && 'bg-red-500/20 text-red-400',
                                                user.status === 'pending' && 'bg-yellow-500/20 text-yellow-400'
                                            )}
                                        >
                                            {user.status}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {editUser?.id === user.id ? (
                                        <>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSave(user.id)}
                                                className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
                                            >
                                                <Save className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={handleCancel}
                                                className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/20"
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add User Dialog */}
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-gray-200">Add New User</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Fill out the form below to create a new user.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-gray-300">Name</Label>
                            <Input
                                id="name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <Label htmlFor="role" className="text-gray-300">Role</Label>
                            <Select
                                value={newUser.role}
                                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                            >
                                <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-gray-200">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="Admin" className="hover:bg-gray-700/50 text-gray-200">Admin</SelectItem>
                                    <SelectItem value="Editor" className="hover:bg-gray-700/50 text-gray-200">Editor</SelectItem>
                                    <SelectItem value="Viewer" className="hover:bg-gray-700/50 text-gray-200">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="status" className="text-gray-300">Status</Label>
                            <Select
                                value={newUser.status}
                                onValueChange={(value) => setNewUser({ ...newUser, status: value as 'active' | 'inactive' | 'pending' })}
                            >
                                <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-gray-200">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="active" className="hover:bg-gray-700/50 text-gray-200">Active</SelectItem>
                                    <SelectItem value="inactive" className="hover:bg-gray-700/50 text-gray-200">Inactive</SelectItem>
                                    <SelectItem value="pending" className="hover:bg-gray-700/50 text-gray-200">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddUserDialogOpen(false)}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddUser}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Multiple Users Dialog */}
            <Dialog open={isDeleteMultipleDialogOpen} onOpenChange={setIsDeleteMultipleDialogOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-gray-200">Delete Users</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to delete the selected users? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelDeleteSelected}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDeleteSelected}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster richColors/>
        </div>
    );
};

const ProductsContent = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
    });
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [isDeleteMultipleDialogOpen, setIsDeleteMultipleDialogOpen] = useState(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditProduct(product);
    };

    const handleSave = (id: string) => {
        if (editProduct!.price < 0 || editProduct!.stock < 0) {
            toast.error("Price and stock must be non-negative.");
            return;
        }
        setProducts(products.map(p => (p.id === id ? { ...editProduct!, id: id } : p)));
        setEditProduct(null);
        toast.success("Product updated successfully!");
    };

    const handleCancel = () => {
        setEditProduct(null);
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted successfully!");
    };

    const handleAddProduct = () => {
        if (!newProduct.name.trim() || !newProduct.description.trim() || !newProduct.category.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (newProduct.price < 0 || newProduct.stock < 0) {
             toast.error("Price and stock must be non-negative.");
            return;
        }

        const createdProduct: Product = {
            id: crypto.randomUUID(),
            ...newProduct,
        };
        setProducts([...products, createdProduct]);
        setNewProduct({ name: '', description: '', price: 0, category: '', stock: 0 }); // Reset form
        setIsAddProductDialogOpen(false);
        toast.success("Product added successfully!");
    };

      const handleCheckboxChange = (productId: string) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleDeleteSelected = () => {
        if (selectedProducts.length === 0) {
            toast.error("Please select products to delete.");
            return;
        }
        setIsDeleteMultipleDialogOpen(true);
    };

    const confirmDeleteSelected = () => {
        setProducts((prevProducts) => prevProducts.filter((product) => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
        setIsDeleteMultipleDialogOpen(false);
        toast.success("Selected products deleted successfully!");
    };

    const cancelDeleteSelected = () => {
        setIsDeleteMultipleDialogOpen(false);
    };

    const allSelected = filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length;
     const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map((product) => product.id));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Products</h2>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs bg-gray-800 border-gray-700 text-gray-200"
                />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleDeleteSelected}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border-red-500/30"
                        disabled={selectedProducts.length === 0}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                    </Button>
                    <Button
                        onClick={() => setIsAddProductDialogOpen(true)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/30"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Product Table */}
            <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-800/50">
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Description</TableHead>
                            <TableHead className="text-gray-300">Price</TableHead>
                            <TableHead className="text-gray-300">Category</TableHead>
                            <TableHead className="text-gray-300">Stock</TableHead>
                            <TableHead className="text-right text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-800/50 transition-colors">
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleCheckboxChange(product.id)}
                                        className="h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-gray-200">
                                    {editProduct?.id === product.id ? (
                                        <Input
                                            type="text"
                                            value={editProduct.name}
                                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editProduct?.id === product.id ? (
                                        <Textarea
                                            value={editProduct.description}
                                            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editProduct?.id === product.id ? (
                                        <Input
                                            type="number"
                                            value={editProduct.price}
                                            onChange={(e) =>
                                                setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
                                            }
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        product.price
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editProduct?.id === product.id ? (
                                        <Input
                                            type="text"
                                            value={editProduct.category}
                                            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        product.category
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    {editProduct?.id === product.id ? (
                                        <Input
                                            type="number"
                                            value={editProduct.stock}
                                            onChange={(e) =>
                                                setEditProduct({ ...editProduct, stock: parseInt(e.target.value, 10) })
                                            }
                                            className="bg-gray-800 border-gray-700 text-gray-200"
                                        />
                                    ) : (
                                        product.stock
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {editProduct?.id === product.id ? (
                                        <>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSave(product.id)}
                                                className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
                                            >
                                                <Save className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={handleCancel}
                                                className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/20"
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleEdit(product)}
                                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add Product Dialog */}
            <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-gray-200">Add New Product</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Fill out the form below to create a new product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-gray-300">Name</Label>
                            <Input
                                id="name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-gray-300">Description</Label>
                            <Textarea
                                id="description"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter description"
                            />
                        </div>
                        <div>
                            <Label htmlFor="price" className="text-gray-300">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter price"
                            />
                        </div>
                        <div>
                            <Label htmlFor="category" className="text-gray-300">Category</Label>
                            <Input
                                id="category"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter category"
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock" className="text-gray-300">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                                placeholder="Enter stock"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddProductDialogOpen(false)}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddProduct}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             {/* Delete Multiple Products Dialog */}
            <Dialog open={isDeleteMultipleDialogOpen} onOpenChange={setIsDeleteMultipleDialogOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-gray-200">Delete Products</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to delete the selected products? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelDeleteSelected}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDeleteSelected}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster richColors/>
        </div>
    );
};

const ReportsContent = () => {
    const [reportType, setReportType] = useState('sales');
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState<any>(null); // Replace 'any' with a specific type if possible

    const generateReport = useCallback(() => {
        setLoading(true);
        // Simulate report generation
        setTimeout(() => {
            // Dummy report data based on reportType
            let data: any; // Use a more specific type if you have one
            if (reportType === 'sales') {
                data = [
                    { month: 'Jan', sales: 120 },
                    { month: 'Feb', sales: 150 },
                    { month: 'Mar', sales: 200 },
                    { month: 'Apr', sales: 180 },
                    { month: 'May', sales: 250 },
                ];
            } else if (reportType === 'inventory') {
                data = [
                    { product: 'Product A', stock: 100, category: 'Electronics' },
                    { product: 'Product B', stock: 50, category: 'Clothing' },
                    { product: 'Product C', stock: 20, category: 'Home Goods' },
                    { product: 'Product D', stock: 150, category: 'Books' },
                ];
            } else {
                data = { message: 'No data available for this report type.' };
            }

            setReportData(data);
            setLoading(false);
        }, 2000); // Simulate a 2-second delay
    }, [reportType]);

    useEffect(() => {
        generateReport();
    }, [generateReport]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Reports</h2>

            <div className="mb-6">
                <Label htmlFor="report-type" className="text-gray-300 mr-2">Report Type:</Label>
                <Select onValueChange={setReportType} value={reportType}>
                    <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="sales" className="hover:bg-gray-700/50 text-gray-200">Sales Report</SelectItem>
                        <SelectItem value="inventory" className="hover:bg-gray-700/50 text-gray-200">Inventory Report</SelectItem>
                        {/* Add more report types as needed */}
                    </SelectContent>
                </Select>
                <Button
                    onClick={generateReport}
                    disabled={loading}
                    className="ml-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/30"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                        </>
                    ) : (
                        "Generate Report"
                    )}
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
                </div>
            ) : reportData ? (
                <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                        {reportType === 'sales' ? 'Sales Report' :
                            reportType === 'inventory' ? 'Inventory Report' :
                                'Report Data'}
                    </h3>
                    {reportType === 'sales' && Array.isArray(reportData) ? (
                        <Table>
                            <TableHeader className="bg-gray-800/50">
                                <TableRow>
                                    <TableHead className="text-gray-300">Month</TableHead>
                                    <TableHead className="text-gray-300">Sales</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportData.map((item: any, index: number) => ( // Use 'any' here, or create a Sales type
                                    <TableRow key={index} className="hover:bg-gray-800/50 transition-colors">
                                        <TableCell className="text-gray-200">{item.month}</TableCell>
                                        <TableCell className="text-gray-200">{item.sales}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : reportType === 'inventory' && Array.isArray(reportData) ? (
                        <Table>
                            <TableHeader className="bg-gray-800/50">
                                <TableRow>
                                    <TableHead className="text-gray-300">Product</TableHead>
                                    <TableHead className="text-gray-300">Stock</TableHead>
                                    <TableHead className="text-gray-300">Category</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportData.map((item: any, index: number) => (  // Use 'any' here, or create an Inventory type
                                    <TableRow key={index} className="hover:bg-gray-800/50 transition-colors">
                                        <TableCell className="text-gray-200">{item.product}</TableCell>
                                        <TableCell className="text-gray-200">{item.stock}</TableCell>
                                        <TableCell className="text-gray-200">{item.category}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-gray-400">{reportData.message || 'No data to display.'}</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-400">Select a report type to generate.</p>
            )}
        </div>
    );
};

const DocumentsContent = () => {
  const [documents, setDocuments] = useState([
    { id: '1', title: 'Project Proposal', content: 'This is the proposal for the project.' },
    { id: '2', title: 'Meeting Minutes', content: 'Minutes from the last meeting.' },
    { id: '3', title: 'Design Specs', content: 'Detailed design specifications.' },
  ]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDeleteId, setDocumentToDeleteId] = useState<string | null>(null);
  const [draggedDocumentId, setDraggedDocumentId] = useState<string | null>(null);
  const [isListView, setIsListView] = useState(false); // State to toggle between card and list view

  const selectedDocument = documents.find((doc) => doc.id === selectedDocumentId);

  const handleDocumentClick = (id: string) => {
    setSelectedDocumentId(id);
    setIsEditMode(false); // Exit edit mode when selecting a new document
  };

  const handleEdit = () => {
    if (selectedDocument) {
      setIsEditMode(true);
      setEditedContent(selectedDocument.content);
    }
  };

  const handleSave = () => {
    if (selectedDocument) {
      setDocuments(
        documents.map((doc) =>
          doc.id === selectedDocument.id ? { ...doc, content: editedContent } : doc
        )
      );
      setIsEditMode(false);
      toast.success('Document saved successfully!');
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedContent('');
  };

  const handleDelete = (id: string) => {
    setDocumentToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (documentToDeleteId) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDeleteId));
      setSelectedDocumentId(null); // Clear selected document after deletion
      setIsDeleteDialogOpen(false);
      toast.success('Document deleted successfully!');
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDocumentToDeleteId(null);
  };

  const handleAddDocument = () => {
    if (!newDocumentTitle.trim()) {
      toast.error('Please enter a title for the new document.');
      return;
    }
    const newDocument = {
      id: crypto.randomUUID(),
      title: newDocumentTitle,
      content: '', // Start with empty content
    };
    setDocuments([...documents, newDocument]);
    setNewDocumentTitle(''); // Reset title input
    setIsAddDialogOpen(false);
    toast.success('Document added successfully!');
  };

    const handleDragStart = (id: string) => {
    setDraggedDocumentId(id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary for drop to work
  };

    const handleDrop = (targetId: string) => {
    if (draggedDocumentId === targetId) return; // Prevent dropping on itself

    const draggedIndex = documents.findIndex((doc) => doc.id === draggedDocumentId);
    const targetIndex = documents.findIndex((doc) => doc.id === targetId);

    if (draggedIndex < 0 || targetIndex < 0) return; // Safety check

    const newDocuments = [...documents];
    // Remove the dragged document
    const [draggedDoc] = newDocuments.splice(draggedIndex, 1);
    // Insert it at the new position
    newDocuments.splice(targetIndex, 0, draggedDoc);

    setDocuments(newDocuments);
    setDraggedDocumentId(null); // Reset
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">Documents</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
            <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/30"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
            <Button
                variant="outline"
                onClick={() => setIsListView(!isListView)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                >
                {isListView ? <List className="h-4 w-4"/> : <List className="h-4 w-4"/>}
            </Button>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search documents..."
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      </div>
      <div className={cn(
        "flex gap-4",
        isListView ? "flex-col" : "flex-wrap"
      )}>
        {documents.map((doc) => (
            <div
                key={doc.id}
                draggable
                onDragStart={() => handleDragStart(doc.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(doc.id, e)}
                className={cn(
                    "bg-gray-800 rounded-lg p-4 shadow-md transition-all duration-200",
                    "border border-gray-700",
                    isListView
                    ? "w-full flex items-center gap-4 cursor-move"
                    : "w-full md:w-1/2 lg:w-1/3 cursor-move",
                    draggedDocumentId === doc.id && "opacity-50",
                )}
                onClick={() => handleDocumentClick(doc.id)}
            >
                {isListView && <GripVertical className="w-4 h-4 text-gray-400"/>}
                <h3 className="text-lg font-semibold text-gray-200">{doc.title}</h3>
            </div>
        ))}
      </div>
      {selectedDocument && (
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-200">{selectedDocument.title}</h3>
             <div>
                {isEditMode ? (
                <>
                    <Button
                    onClick={handleSave}
                    className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 border-green-500/30 mr-2"
                    >
                    <Save className="h-4 w-4" />
                    </Button>
                    <Button
                    onClick={handleCancel}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                    >
                    <XCircle className="h-4 w-4" />
                    </Button>
                </>
                ) : (
                <>
                    <Button
                    onClick={handleEdit}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 mr-2"
                    >
                    <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                    onClick={() => handleDelete(selectedDocument.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                    <Trash2 className="h-4 w-4" />
                    </Button>
                </>
                )}
            </div>
          </div>
          {isEditMode ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="bg-gray-900 border-gray-700 text-gray-200 min-h-[200px]"
            />
          ) : (
            <p className="text-gray-300 whitespace-pre-line">{selectedDocument.content}</p>
          )}
        </div>
      )}

       {/* Add Document Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-200">Add New Document</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a title for your new document.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="document-title" className="text-gray-300">
              Title
            </Label>
            <Input
              id="document-title"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              className="bg-gray-900 border-gray-700 text-gray-200"
              placeholder="Enter document title"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDocument}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Document Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-200">Delete Document</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this document? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelDelete}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster richColors/>
    </div>
  );
};

const SettingsContent = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software Engineer',
        theme: 'dark',
        notificationsEnabled: true,
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success("Profile updated successfully!");
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values
        setProfile({
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Software Engineer',
            theme: 'dark',
            notificationsEnabled: true,
        });
    };

    const handleChange = (field: keyof typeof profile, value: any) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Settings</h2>

            <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700 space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name" className="text-gray-300">Name</Label>
                        {isEditing ? (
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                            />
                        ) : (
                            <p className="text-gray-200">{profile.name}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        {isEditing ? (
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                            />
                        ) : (
                            <p className="text-gray-200">{profile.email}</p>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                        {isEditing ? (
                            <Textarea
                                id="bio"
                                value={profile.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                className="bg-gray-900 border-gray-700 text-gray-200"
                            />
                        ) : (
                            <p className="text-gray-200 whitespace-pre-line">{profile.bio}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="theme" className="text-gray-300">Theme</Label>
                        {isEditing ? (
                            <Select
                                value={profile.theme}
                                onValueChange={(value) => handleChange('theme', value)}
                            >
                                <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-gray-200">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="dark" className="hover:bg-gray-700/50 text-gray-200">Dark</SelectItem>
                                    <SelectItem value="light" className="hover:bg-gray-700/50 text-gray-200">Light</SelectItem>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className="text-gray-200">{profile.theme}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="notifications" className="text-gray-300">Notifications</Label>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    checked={profile.notificationsEnabled}
                                    onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-gray-200">Enabled</span>
                            </div>
                        ) : (
                            <p className="text-gray-200">{profile.notificationsEnabled ? 'Enabled' : 'Disabled'}</p>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <Button
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={handleEdit}
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/30"
                        >
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>
            <Toaster richColors/>
        </div>
    );
};

const LoginContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate login process
        try {
            // Replace this with your actual authentication logic
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s delay

            if (email === 'test@example.com' && password === 'password') {
                // Successful login
                toast.success("Logged in successfully!");
                // Redirect to dashboard or home page
                // window.location.href = '/dashboard'; //  basic redirect
            } else {
                // Invalid credentials
                setError('Invalid credentials. Please try again.');
                toast.error("Invalid credentials");
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during login.');
            toast.error("An error occurred");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-gray-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-gray-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-blue-400 hover:text-blue-300">Forgot Password?</a>
                </div>
            </div>
            <Toaster richColors/>
        </div>
    );
};

// ===============================
// Main App Component
// ===============================

const ManagementConsole = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardContent />;
            case 'users':
                return <UsersContent />;
            case 'products':
                return <ProductsContent />;
            case 'reports':
                return <ReportsContent />;
            case 'documents':
                return <DocumentsContent/>;
            case 'settings':
                return <SettingsContent />;
            case 'login':
                return <LoginContent />;
            default:
                return <DashboardContent />;
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleSidebarItemClick = (id: string) => {
        setActiveSection(id);
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Mobile Menu Button */}
            <div className="md:hidden p-2 absolute top-2 left-2 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMobileMenuToggle}
                    className="text-gray-400 hover:text-gray-300"
                >
                    {isMobileSidebarOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || isMobileSidebarOpen) && (
                    <motion.div
                        initial={{ x: isSidebarOpen ? 0 : '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isSidebarOpen ? '-100%' : '-100%', opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            duration: 0.2,
                        }}
                        className={cn(
                            'bg-gray-800 text-gray-300 w-64 md:w-64 border-r border-gray-700 overflow-y-auto',
                            'fixed md:static top-0 left-0 h-full z-40',
                            'transition-transform duration-300 ease-in-out',
                            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        )}
                    >
                        <div className="p-4 flex items-center justify-between border-b border-gray-700">
                            <h1 className="text-xl font-semibold text-gray-200">Console</h1>
                            <button
                                onClick={handleSidebarToggle}
                                className="md:block hidden text-gray-400 hover:text-gray-300"
                            >
                                {isSidebarOpen ? (
                                    <ChevronLeft className="h-6 w-6" />
                                ) : (
                                    <ChevronRight className="h-6 w-6" />
                                )}
                            </button>
                            {/* Mobile close button */}
                            <div className="md:hidden block">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleMobileMenuToggle}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                        <nav className="p-4 space-y-2">
                            {sidebarItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={activeSection === item.id ? 'default' : 'ghost'}
                                    className={cn(
                                        'w-full flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'justify-start',
                                        activeSection === item.id && 'bg-blue-500 text-white hover:bg-blue-600'
                                    )}
                                    onClick={() => handleSidebarItemClick(item.id)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="truncate">{item.label}</span>
                                </Button>
                            ))}
                        </nav>
                        <Separator className="bg-gray-700 my-4" />
                        <div className="p-4">
                            <Button
                                variant="outline"
                                className="w-full text-gray-300 hover:bg-gray-700 hover:text-white border-gray-700"
                                onClick={() => {
                                    setActiveSection('login');
                                    setIsMobileSidebarOpen(false);
                                }}
                            >
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className={cn(
                'flex-1 transition-all duration-300 ease-in-out',
                isSidebarOpen ? 'ml-64' : 'ml-0 md:ml-0',
                isMobileSidebarOpen && 'ml-0'
            )}>
                {renderContent()}
            </div>
        </div>
    );
};

export default ManagementConsole;
