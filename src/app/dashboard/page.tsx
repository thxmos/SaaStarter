import { getUser } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const DashboardPage = async () => {
	const user = await getUser();
	if (!user) {
		redirect('/auth');
	}
	return (
		<>
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
				<div className='flex items-center gap-2 border p-4 rounded-lg bg-card transition-all cursor-pointer hover:shadow-xl'>
					{user.avatar && <Image src={user.avatar} alt='user_avatar' className='rounded-full size-16' height={40} width={40} />}
					<div className='flex flex-col'>
						<span className='font-semibold text-xl'>{user.name}</span>
						<span>{user.email}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
