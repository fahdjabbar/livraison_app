import { TruckIcon } from '@heroicons/react/24/solid';

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center gap-2" {...props}>
            <TruckIcon className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-extrabold text-blue-600 tracking-tight">
                Livraison
                <span className="text-orange-400">Pro</span>
            </span>
        </div>
    );
}
